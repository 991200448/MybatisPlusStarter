/**
 * 用户管理API接口
 */
const API = {
    // 基础URL
    baseURL: '/user',
    
    /**
     * 保存用户
     * @param {Object} user - 用户对象
     * @returns {Promise}
     */
    saveUser(user) {
        return axios.post(this.baseURL, user);
    },
    
    /**
     * 删除用户
     * @param {Number} id - 用户ID
     * @returns {Promise}
     */
    deleteUser(id) {
        return axios.delete(`${this.baseURL}/${id}`);
    },
    
    /**
     * 更新用户
     * @param {Object} user - 用户对象
     * @returns {Promise}
     */
    updateUser(user) {
        return axios.put(this.baseURL, user);
    },
    
    /**
     * 根据ID获取用户
     * @param {Number} id - 用户ID
     * @returns {Promise}
     */
    getUserById(id) {
        return axios.get(`${this.baseURL}/${id}`);
    },
    
    /**
     * 批量删除用户
     * @param {Array} ids - 用户ID数组
     * @returns {Promise}
     */
    batchDeleteUsers(ids) {
        return axios.delete(`${this.baseURL}/batchDelete`, {
            data: ids
        });
    },
    
    /**
     * 分页查询用户
     * @param {Object} params - 查询参数
     * @returns {Promise}
     */
    getUsers(params) {
        return axios.get(`${this.baseURL}/page`, {
            params: params
        });
    },
    
    /**
     * 获取用户总数
     * @returns {Promise}
     */
    countUsers() {
        return axios.get(`${this.baseURL}/count`);
    }
};