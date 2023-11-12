<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { userMenuStore } from '../store/menus';

import { TagItem } from '../components/types/TagsList';
import { useRoute, useRouter } from 'vue-router';

const isCollapse = ref(false);

const toggleCollapse = () => {
	isCollapse.value = !isCollapse.value;
};

// 根据 isCollapse 的值计算菜单的宽度
// const sidebarWidth = computed(() => (isCollapse.value ? '65px' : '200px'));

const { menus } = userMenuStore();

const initTagsList = JSON.parse(localStorage.getItem('tagsList') as string)

// 页签
const tagsList = ref<TagItem[]>(initTagsList || [
	{
		name: '控制台',
		path: 'dashboard',
		routeName: 'dashboard',
	},
]);

const route = useRoute()
const router = useRouter()


const updateLocalStorage = () => {
  localStorage.setItem('tagsList', JSON.stringify(tagsList.value));
};

const activeTag = ref(localStorage.getItem('activeTag') || '')

// 当组件加载时，可能需要检查 activeTag 是否有效，并跳转到该路由
onMounted(() => {
  if (activeTag.value) {
    router.push(activeTag.value);
  }
});

// 更新当前激活的页签
const updateActiveTag = () => {
	const currentPath = route.name;
	const foundTag = tagsList.value.find(item => item.routeName === currentPath);
  if (foundTag) {
    activeTag.value = foundTag.routeName;
		localStorage.setItem('activeTag', activeTag.value);
	}
};

// 监听路由变化来更新激活的页签
watch(() => route.path, updateActiveTag);

const handleMenuSelected = (param: any) => {
	const tag: TagItem = {
		name: param.name,
		path: param.path,
		routeName: param.routeName,
	};
	if (tagsList.value.some((item) => item.routeName === tag.routeName)) {
	} else {
		tagsList.value.push(tag);
	}

	updateLocalStorage();
};

const handleCloseTag = (tag: TagItem) => {
  const index = tagsList.value.findIndex(item => item.routeName === tag.routeName);
  tagsList.value.splice(index, 1); // 使用 splice 直接在原数组上操作，而不是创建新数组

  if (tagsList.value.length === 0) {
    // 如果已经没有其他页签了，可以跳转到默认页
    router.push('/');
  } else if (index > 0) {
    // 跳转到被移除页签的前一个页签
    router.push(tagsList.value[index - 1].routeName);
  } else {
    // 如果被移除的是第一个页签，跳转到现在的第一个页签
    router.push(tagsList.value[0].routeName);
	}

	updateLocalStorage();
};
</script>

<template>
	<div class="default-layout-container">
		<el-row class="layout-container">
			<!-- 左侧菜单 -->
			<el-col :span="isCollapse ? 1 : 4" class="left-container">
				<SidebarNav
					:isCollapse="isCollapse"
					:menus="menus"
					:tagsList="tagsList"
					@menu-selected="handleMenuSelected"
				/>
			</el-col>
			<el-col :span="isCollapse ? 23 : 20">
				<!-- 右侧内容 -->
				<div class="right-container">
					<!-- 右侧顶部 / 面包屑 -->
					<el-row class="right-top-container">
						<el-col :span="24">
							<div class="right-top-content">
								<!-- 左侧菜单栏控制 -->
								<div class="menu-switch" @click="toggleCollapse">
									<el-icon>
										<component :is="isCollapse ? 'Expand' : 'Fold'" />
									</el-icon>
								</div>
								<!-- 面包屑 -->
								<div class="right-top-breadcrumb">
									<HeaderNav />
								</div>
							</div>
						</el-col>
					</el-row>

					<!-- 页签 -->
					<el-row>
						<el-col :span="24">
							<TagsNav :tagsList="tagsList" @close-tag="handleCloseTag" :activeTag="activeTag" />
						</el-col>
					</el-row>

					<!-- 主要内容区域 -->
					<el-row class="right-main-container">
						<el-col :span="24" class="main-container">
							<router-view style="{ border-radius: 16px;}"></router-view>
						</el-col>
					</el-row>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<style lang="scss" scoped>
.default-layout-container {
	width: 100vw;
	height: 100vh;
	// transition: 0.3s all ease;
	.layout-container {
		width: 100%;
		height: 100%;
	}

	.left-container {
		height: 100%;
		/* 使容器宽度变化有动画效果 */
		// flex: 0 0 auto; /* 不占用额外空间，宽度由内容决定 */
		// transition: width 0.3s ease; /* 可选的过渡动画 */
		background-color: #374152;
	}

	.right-container {
		// flex: 1; /* 占据所有剩余空间 */
		height: 100%;
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
			background-color: #ecebec;

			.main-container {
				box-sizing: border-box;
				padding: 16px;
				border-radius: 16px;
				overflow: auto;
			}
		}
	}
}
</style>
