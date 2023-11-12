<script setup lang="ts">
import { ref } from 'vue';

const isCollapse = ref(false);

const toggleCollapse = () => {
	isCollapse.value = !isCollapse.value;
};
</script>

<template>
	<div class="default-layout-container">
		<!-- 左侧菜单 -->
		<div class="left-container">
			<SidebarNav :isCollapse="isCollapse" />
		</div>
		<!-- 右侧内容 -->
		<div  class="right-container">
			<!-- 右侧顶部 / 面包屑 -->
			<el-row class="right-top-container">
				<el-col :span="24">
					<div class="right-top-content">
						<!-- 左侧菜单栏控制 -->
						<div class="menu-switch" @click="toggleCollapse">
							<el-icon v-if="isCollapse"><Expand /></el-icon>
							<el-icon v-else><Fold /></el-icon>
						</div>
						<!-- 面包屑 -->
						<div class="right-top-breadcrumb">
							<HeaderNav />
						</div>
					</div>
				</el-col>
			</el-row>
			<!-- 主要内容区域 -->
			<el-row class="right-main-container">
				<el-col :span="24">
					<router-view></router-view>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.default-layout-container {
	// width: 100vw;
	// height: 100vh;
	display: flex;

	.left-container {
		/* 使容器宽度变化有动画效果 */
		flex: 0 0 auto; /* 不占用额外空间，宽度由内容决定 */
		transition: width 0.3s; /* 可选的过渡动画 */
		background-color: #299a48;
	}

	.right-container {
		flex: 1; /* 占据所有剩余空间 */
		display: flex;
		flex-direction: column;

		.right-top-container {
			flex: 0 0 auto; /* 不占用额外空间，宽度由内容决定 */
			background-color: #ffcc40;

			.right-top-content {
				height: 100%;
				display: flex;
				justify-content: start;
				align-items: center;

				.menu-switch {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 40px;
					height: 40px;
				}
			}
			.right-top-breadcrumb {
				height: 100%;
				display: flex;
				justify-content: start;
				align-items: center;
			}
		}

		.right-main-container {
			flex: 1; /* 占据所有剩余空间 */
			background-color: #63bbfa;
		}
	}
}
</style>
