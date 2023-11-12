<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbList"
        :key="index"
        :to="item.to"
      >
        {{ item.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <!-- ... 其他内容 ... -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 初始化面包屑列表
      breadcrumbList: [],
    };
  },
  watch: {
    // 监听路由变化，更新面包屑
    $route: {
      immediate: true,
      handler(to) {
        this.generateBreadcrumb(to);
      },
    },
  },
  methods: {
    generateBreadcrumb(route) {
      const routeMatched = route.matched;
			this.breadcrumbList = routeMatched.map((m) => {
				// console.log('m', m)

        return {
          name:   m.meta.title || m.path.split('/').pop(), // 使用元信息中的标题或路径名
          to: this.getPath(m),
        };
			});
			// console.log('breadcrumbList', this.breadcrumbList)
    },
    getPath(route) {
      // 生成面包屑的链接，根据路由结构进行调整
      const path = route.path;
      return path ? { path } : '';
    },
  },
};
</script>
