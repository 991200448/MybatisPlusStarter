/**
 * 用户管理系统主要逻辑
 */
new Vue({
    el: '#app',
    data() {
        return {
            // 用户列表数据
            userList: [],
            // 选中的用户
            selectedUsers: [],
            // 用户总数
            userCount: 0,
            // 分页信息
            pagination: {
                current: 1,
                size: 10,
                total: 0
            },
            // 搜索表单
            searchForm: {
                name: '',
                age: ''
            },
            // 排序信息
            sortInfo: {
                field: 'id',
                order: 'asc'
            },
            // 用户表单
            userForm: {
                id: null,
                name: '',
                age: ''
            },
            // 表单验证规则
            rules: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                ],
                age: [
                    { required: true, message: '请输入年龄', trigger: 'blur' },
                    { type: 'number', message: '年龄必须为数字值', trigger: 'blur' },
                    { type: 'number', min: 0, max: 150, message: '年龄必须在0到150之间', trigger: 'blur' }
                ]
            },
            // 对话框相关
            dialogVisible: false,
            dialogTitle: '新增用户',
            editMode: false,
            // 年龄错误提示
            ageError: ''
        };
    },
    created() {
        // 页面创建时加载数据
        this.loadUserData();
        this.loadUserCount();
    },
    methods: {
        /**
         * 验证年龄输入
         * @param {string} value - 要验证的年龄值
         * @returns {boolean} - 是否为有效的年龄
         */
        validateAge(value) {
            // 如果为空，不显示错误（由表单验证处理必填项）
            if (!value) {
                this.ageError = '';
                return true;
            }
            
            // 检查是否为数字
            if (!/^\d+$/.test(value)) {
                return false;
            }
            
            // 检查范围
            const age = parseInt(value);
            if (age < 0 || age > 150) {
                return false;
            }
            
            // 验证通过，清除错误提示
            this.ageError = '';
            return true;
        },
        
        /**
         * 验证是否为数字
         */
        isNumber(value) {
            return /^\d+$/.test(value);
        },

        /**
         * 加载用户数据
         */
        loadUserData() {
            // 检查年龄输入是否为数字
            if (this.searchForm.age && !this.validateAge(this.searchForm.age)) {
                return;
            }

            const params = {
                current: this.pagination.current,
                size: this.pagination.size,
                name: this.searchForm.name || undefined,
                age: this.searchForm.age ? parseInt(this.searchForm.age) : undefined,
                sortField: this.sortInfo.field,
                sortOrder: this.sortInfo.order
            };

            API.getUsers(params).then(response => {
                if (response.data.code === 200) {
                    const pageData = response.data.data;
                    this.userList = pageData.records;
                    this.pagination.total = pageData.total;
                } else {
                    this.$message.error('获取用户列表失败：' + response.data.message);
                }
            }).catch(error => {
                this.$message.error('获取用户列表失败：' + error.message);
            });
        },

        /**
         * 加载用户总数
         */
        loadUserCount() {
            API.countUsers().then(response => {
                if (response.data.code === 200) {
                    this.userCount = response.data.data;
                }
            }).catch(error => {
                this.$message.error('获取用户总数失败：' + error.message);
            });
        },

        /**
         * 搜索用户
         */
        searchUsers() {
            this.pagination.current = 1; // 重置到第一页
            this.loadUserData();
        },

        /**
         * 重置搜索条件
         */
        resetSearch() {
            this.searchForm.name = '';
            this.searchForm.age = '';
            this.searchUsers();
        },

        /**
         * 处理页码变化
         */
        handleCurrentChange(current) {
            this.pagination.current = current;
            this.loadUserData();
        },

        /**
         * 处理每页条数变化
         */
        handleSizeChange(size) {
            this.pagination.size = size;
            this.pagination.current = 1; // 重置到第一页
            this.loadUserData();
        },

        /**
         * 处理表格选择变化
         */
        handleSelectionChange(selection) {
            this.selectedUsers = selection;
        },

        /**
         * 显示新增用户对话框
         */
        showAddDialog() {
            this.dialogTitle = '新增用户';
            this.editMode = false;
            this.userForm = {
                id: null,
                name: '',
                age: ''
            };
            this.dialogVisible = true;
            // 在下一个事件循环中重置表单验证
            this.$nextTick(() => {
                if (this.$refs.userForm) {
                    this.$refs.userForm.clearValidate();
                }
            });
        },

        /**
         * 显示编辑用户对话框
         */
        handleEdit(row) {
            this.dialogTitle = '编辑用户';
            this.editMode = true;
            // 克隆对象，避免直接修改表格数据
            this.userForm = {
                id: row.id,
                name: row.name,
                age: row.age
            };
            this.dialogVisible = true;
            // 在下一个事件循环中重置表单验证
            this.$nextTick(() => {
                if (this.$refs.userForm) {
                    this.$refs.userForm.clearValidate();
                }
            });
        },

        /**
         * 提交表单
         */
        submitForm() {
            // 手动验证年龄输入
            if (!this.validateAge(this.userForm.age)) {
                return;
            }

            this.$refs.userForm.validate((valid) => {
                if (valid) {
                    const user = {
                        ...this.userForm,
                        age: parseInt(this.userForm.age)
                    };

                    const request = this.editMode ?
                        API.updateUser(user) :
                        API.saveUser(user);

                    request.then(response => {
                        if (response.data.code === 200 && response.data.data) {
                            this.$message.success(this.editMode ? '更新成功' : '添加成功');
                            this.dialogVisible = false;
                            this.loadUserData();
                            this.loadUserCount();
                        } else {
                            this.$message.error((this.editMode ? '更新' : '添加') + '失败：' + response.data.message);
                        }
                    }).catch(error => {
                        this.$message.error((this.editMode ? '更新' : '添加') + '失败：' + error.message);
                    });
                } else {
                    return false;
                }
            });
        },

        /**
         * 删除用户
         */
        handleDelete(row) {
            this.$confirm('确认删除该用户?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                API.deleteUser(row.id).then(response => {
                    if (response.data.code === 200 && response.data.data) {
                        this.$message.success('删除成功');
                        this.loadUserData();
                        this.loadUserCount();
                    } else {
                        this.$message.error('删除失败：' + response.data.message);
                    }
                }).catch(error => {
                    this.$message.error('删除失败：' + error.message);
                });
            }).catch(() => {
                // 取消删除，不做任何操作
            });
        },

        /**
         * 批量删除用户
         */
        batchDeleteUsers() {
            if (this.selectedUsers.length === 0) {
                this.$message.warning('请选择要删除的用户');
                return;
            }

            this.$confirm(`确认删除选中的 ${this.selectedUsers.length} 个用户?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const ids = this.selectedUsers.map(user => user.id);

                API.batchDeleteUsers(ids).then(response => {
                    if (response.data.code === 200 && response.data.data) {
                        this.$message.success('批量删除成功');
                        this.loadUserData();
                        this.loadUserCount();
                    } else {
                        this.$message.error('批量删除失败：' + response.data.message);
                    }
                }).catch(error => {
                    this.$message.error('批量删除失败：' + error.message);
                });
            }).catch(() => {
                // 取消删除，不做任何操作
            });
        }
    }
});