<script lang="ts">
	import '../app.css';
  // noinspection ES6UnusedImports
  import { Sidebar } from "$lib/components/ui";
  import { LayoutDashboard, SquareChartGantt, GitFork, Rss, Settings, LoaderCircle } from "@lucide/svelte";
  import * as server from "$lib/remote/server.remote"
  import { onMount } from "svelte";

  let { children } = $props()

  onMount(() => {
    setInterval(async () => {
      await server.online().refresh()
    }, 10000)
  })
</script>

<svelte:boundary>
  {#snippet pending()}
    <div class="flex flex-col h-full items-center justify-center gap-4">
      <LoaderCircle class="animate-spin size-12"/>
      Loading...
    </div>
  {/snippet}

  <Sidebar.Provider>
    <Sidebar.Root collapsible="icon" variant="floating">
      <Sidebar.Header>
        <Sidebar.Menu>
          <Sidebar.MenuItem>
            <Sidebar.MenuButton>
              {#snippet child({ props })}
                <a {...props} href="/">
                  <Rss class={await server.online() ? "text-green-500" : "text-red-500"}/>
                  <span class="font-bold">Vercel Clone</span>
                </a>
              {/snippet}
            </Sidebar.MenuButton>
          </Sidebar.MenuItem>
        </Sidebar.Menu>
      </Sidebar.Header>
      <Sidebar.Content>
        <Sidebar.Group>
          <Sidebar.Menu>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton>
                {#snippet child({ props })}
                  <a {...props} href="/">
                    <LayoutDashboard/>
                    <span>Dashboard</span>
                  </a>
                {/snippet}
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton>
                {#snippet child({ props })}
                  <a {...props} href="/projects">
                    <SquareChartGantt/>
                    <span>Projects</span>
                  </a>
                {/snippet}
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton>
                {#snippet child({ props })}
                  <a {...props} href="/sources">
                    <GitFork/>
                    <span>Sources</span>
                  </a>
                {/snippet}
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Group>
        <Sidebar.Group class="mt-auto">
          <Sidebar.Menu>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton>
                {#snippet child({ props })}
                  <a {...props} href="/settings">
                    <Settings/>
                    <span>Settings</span>
                  </a>
                {/snippet}
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Group>
      </Sidebar.Content>
    </Sidebar.Root>
    <Sidebar.Inset class="p-4 gap-2">
      <Sidebar.Trigger/>
      {#if await server.online()}
        <div class="h-full overflow-auto">
          {@render children()}
        </div>
      {:else}
        <div class="flex flex-col h-full items-center justify-center gap-4">
          <div class="flex items-center gap-4">
            <Rss class="text-red-500 size-12"/>
            <h1 class="text-xl font-bold">Server Offline</h1>
          </div>
          <span>Start the server to make any changes</span>
        </div>
      {/if}
    </Sidebar.Inset>
  </Sidebar.Provider>
</svelte:boundary>