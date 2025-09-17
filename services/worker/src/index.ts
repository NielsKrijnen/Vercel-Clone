import { Worker } from "bullmq";
import Docker from "dockerode";
import tar from "tar-fs"

const docker = new Docker({ socketPath: "/var/run/docker.sock" })

async function buildApp(projectId: string) {
  const contextPath = "/usr/src/app/examples/example-app";

  // Pack the build context into a tar stream
  const tarStream = tar.pack(contextPath);

  return new Promise<any[]>((resolve, reject) => {
    docker.buildImage(tarStream, { t: `app-${projectId}` }, (err, stream) => {
      if (err) return reject(err);

      docker.modem.followProgress(
        stream,
        (err, res) => {
          if (err) return reject(err);
          console.log("✅ Build finished");
          resolve(res);
        },
        (event) => {
          if (event.stream) process.stdout.write(event.stream);
          if (event.error) console.error(event.error);
          if (event.status && event.progress) {
            process.stdout.write(`${event.status} ${event.progress}\n`);
          }
        }
      )
    })
  })
}

new Worker("builds", async job => {
  const { id } = job.data
  console.log(`Building project ${id}...`)
  await buildApp(id)

  const container = await docker.createContainer({
    Image: `app-${id}`,
    name: `app-${id}`,
    ExposedPorts: {
      "3000/tcp": {}
    },
    HostConfig: {
      NetworkMode: "vercel-clone_test-net"
    },
    Labels: {
      "traefik.enable": "true",
      [`traefik.http.routers.${id}.rule`]: `Host(\`${id}.localhost\`)`,
      [`traefik.http.services.${id}.loadbalancer.server.port`]: "3000",
    }
  })

  await container.start()
  console.log(`Deployment ready at http://${id}.localhost`)
}, {
  connection: {
    host: "redis",
    port: 6379
  }
})