<script lang="ts">
	import '../app.css';
  // noinspection ES6UnusedImports
  import { Sidebar } from "$lib/components/ui";
  import { LayoutDashboard, SquareChartGantt, GitFork, Rss, Settings } from "@lucide/svelte";

  let { children } = $props();
</script>

<Sidebar.Provider>
  <Sidebar.Root collapsible="icon" variant="floating">
    <Sidebar.Header>
      <Sidebar.Menu>
        <Sidebar.MenuItem>
          <Sidebar.MenuButton>
            {#snippet child({ props })}
              <a {...props} href="/">
                <Rss class="text-green-500"/>
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
                <a {...props} href="/">
                  <SquareChartGantt/>
                  <span>Projects</span>
                </a>
              {/snippet}
            </Sidebar.MenuButton>
          </Sidebar.MenuItem>
          <Sidebar.MenuItem>
            <Sidebar.MenuButton>
              {#snippet child({ props })}
                <a {...props} href="/">
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
  <Sidebar.Inset class="p-4">
    <Sidebar.Trigger/>
    {@render children()}
  </Sidebar.Inset>
</Sidebar.Provider>