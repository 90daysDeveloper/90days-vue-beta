<template>
  <div class="core">
		<div class="mobile">
			<MobileHeader></MobileHeader>
		</div>
		<div class="desktop">
			<DesktopHeader></DesktopHeader>
		</div>
    <div class="content">
			<div class="container router-view">
				<router-view></router-view>
      </div>
    </div>
		<div class="desktop">
			<DesktopFooter></DesktopFooter>
		</div>
		<div class="mobile">
			<MobileFooter></MobileFooter>
		</div>
  </div>
</template>

<script setup>
import DesktopHeader from './DesktopHeader.vue';
import DesktopFooter from './DesktopFooter.vue';
import MobileHeader from './MobileHeader.vue';
import MobileFooter from './MobileFooter.vue';
</script>
