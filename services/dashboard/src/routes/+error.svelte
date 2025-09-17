<script lang="ts">
  import { page } from "$app/state";
</script>

<div class="flex h-full gap-2 flex-col items-center justify-center">
  <h1 class="text-8xl font-medium">{page.status}</h1>
  <span>{page.error?.message ?? "Something went wrong"}</span>
</div>