<template>
  <kobe-table v-if="response">
    <div slot="kobe-table-header" class="kobe-table-header">
        <el-row type="flex" justify="end">
            <el-col :span="7">
                <el-input v-model="form.keyword" placeholder="请输入搜索关键字"></el-input>
            </el-col>
             <el-button @click="onSearch" icon="search"></el-button>
             <el-button type="primary" @click="addFormVisible = true" icon="plus"></el-button>
             <el-button icon="upload2" type="primary"></el-button>
             <el-button icon="setting" type="primary"></el-button>
        </el-row>
    </div>
    <div slot="kobe-table-content" class="kobe-table">
        <el-table :data="response.data" border stripe>
            <el-table-column prop="id" label="步骤编号"  width="180"></el-table-column>
            <el-table-column prop="type_key" label="活动步骤类型"></el-table-column>
            <el-table-column prop="title" label="活动步骤名称"></el-table-column>
            <el-table-column prop="description" label="活动步骤描述"></el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button @click="editSteps(scope.row)" size="small" icon="edit"></el-button>
                    <el-button @click="checkInfo(scope.row)" size="small" icon="information"></el-button>
                    <el-button @click="infoDelete(scope.row.id)" size="small" icon="delete2"></el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 新增dialog -->
        <div class="sc-activity-steps-create">
            <el-dialog title="新增活动步骤" v-model="addFormVisible">
                <el-row type="flex">
                  <el-col>
                    <el-form :inline="true" label-width="100px" :model="addForm">
                      <el-row type="flex" justify="space-between">
                        <el-col :span="12">
                          <el-form-item :required="true" label="步骤编号">
                            <el-input v-model="addForm.id"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item :required="true" label="步骤名称">
                              <el-input v-model="addForm.title"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row type="flex" justify="space-between">
                        <el-col :span="12">
                          <el-form-item :required="true"  label="步骤类型">
                            <el-input v-model="addForm.type_key"></el-input>
                          </el-form-item>
                          </el-col>
                        <el-col :span="12">
                          <el-form-item label="步骤描述">
                            <el-input v-model="addForm.description"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      
                      
                    </el-form>
                  </el-col>
                </el-row>  
                <div slot="footer" class="dialog-footer">
                    <el-button @click="addFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addSteps">确 定</el-button>
                </div>
            </el-dialog>
        </div>
        <!-- 修改dialog -->
        <div class="sc-activity-steps-edit">
            <el-dialog title="修改活动步骤" v-model="editStepsVisible">
                <el-row type="flex">
                  <el-col>
                    <el-form :inline="true" label-width="100px" :model="editInfo">
                      <el-row type="flex" justify="space-between">
                        <el-col :span="12">
                          <el-form-item label="步骤编号">
                            <el-input v-model="editInfo.id"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="步骤名称">
                              <el-input v-model="editInfo.title"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row type="flex" justify="space-between">
                        <el-col :span="12">
                          <el-form-item label="步骤类型">
                            <el-input v-model="editInfo.type_key"></el-input>
                          </el-form-item>
                          </el-col>
                        <el-col :span="12">
                          <el-form-item label="步骤描述">
                            <el-input v-model="editInfo.description"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      
                  </el-form>
                  </el-col>
                </el-row>  
                <div slot="footer" class="dialog-footer">
                    <el-button @click="editStepsVisible = false">取 消</el-button>
                    <el-button type="primary" @click="editSubmit">确 定</el-button>
                </div>
            </el-dialog>
        </div>
        <!-- 查看dialog -->
        <div class="sc-activity-steps-check">
           <el-dialog title="查看活动步骤" v-model="checkInfodialog">
              <el-row type="flex">
                <el-col class="sc-activity-steps-check-content">
                  <el-card>
                        <div slot="header">
                          <span class="sc-activity-steps-check-title">活动步骤信息</span>
                        </div>
                        <div class="sc-activity-steps-check-box">
                          <div>步骤编号: <span>{{ userInfo.id }}</span></div>
                           <div>步骤名称: <span>{{ userInfo.title }}</span></div>
                          <div>步骤类型: <span>{{ userInfo.type_key }}</span></div>
                          <div>描述: <span>{{ userInfo.description }}</span></div>
                        </div>
                  </el-card>
                </el-col>
              </el-row>  
           </el-dialog>
        </div>
    </div>
    <div slot="kobe-table-footer" class="kobe-table-footer">
        <el-row type="flex" justify="center">
        <el-col :span="12">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="response.currentPage"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="response.pageSize"
            :total="response.count"
            layout="total, sizes, prev, pager, next, jumper">
          </el-pagination>
        </el-col>
      </el-row>
    </div>
  </kobe-table>
</template>

<script>
import config from 'src/config'
import api from 'src/api'

export default{
  name: 'sc-activity-steps',
  data () {
    return {
      addFormVisible: false,
      response: null,
      error: null,
      form: {
        keyword: ''
      },
      addForm: {
        id: '',
        title: '',
        type_key: '',
        description: ''
      },
      userInfo: [],
      checkInfodialog: false,
      editInfo: [],
      editStepsVisible: false
    }
  },
  methods: {
    handleSizeChange (value) {
      const data = {
        currentPage: this.response.currentPage,
        pageSize: value,
        ...this.form
      }
      this.updateStepList(data)
    },
    handleCurrentChange (value) {
      const data = {
        currentPage: value,
        pageSize: this.response.pageSize,
        ...this.form
      }
      this.updateStepList(data)
    },
    getStepList () {
      api.GET(config.activity.stepList)
        .then(response => {
          if (response.status !== 200) {
            this.error = response.statusText
            return
          }
          if (response.data.errcode === '0000') {
            this.response = response.data.data
            console.log(response)
          } else {
            this.$message.error('发生了错误，请重试！！')
          }
        })
    },
    updateStepList (data) {
      api.GET(config.activity.stepList, data)
        .then(response => {
          if (response.status !== 200) {
            this.error = response.statusText
            return
          }
          if (response.data.errcode === '0000') {
            this.response = response.data.data
          } else {
            this.$message.error('发生了错误，请重试！！')
          }
        })
    },
    onSearch () {
      api.GET(config.activity.stepList, this.form)
        .then(response => {
          if (response.status !== 200) {
            this.error = response.statusText
            return
          }
          if (response.data.errcode === '0000') {
            this.response = response.data.data
          } else {
            this.$message.error('发生了错误，请重试！！')
          }
        })
    },
    addSteps () {
      if (this.addForm.title === '' || this.addForm.type_key === '') {
        this.$message({
          message: '请输入信息',
          type: 'info'
        })
        return
      }
      this.addFormVisible = false
      api.POST(config.activity.stepCreate, this.addForm)
      .then(response => {
        if (response.status !== 200) {
          this.$message.error(response.statusText)
          return
        }
        if (response.data.errcode === '0000') {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          const data = {
            pageSize: this.response.pageSize,
            currentPage: this.response.currentPage,
            ...this.form
          }
          this.updateStepList(data)
        } else {
          this.$message.error('发生了错误,请重试')
        }
      })
      .catch(error => {
        this.$message.error(error)
      })
    },
    checkInfo (user) {
      this.userInfo = user
      this.checkInfodialog = true
    },
    infoDelete (id) {
      this.$confirm('是否确定删除该条数据', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.POST(config.activity.stepDelete, {
          id: id
        })
        .then(response => {
          if (response.status !== 200) {
            this.$message.error(response.statusText)
            return
          }
          if (response.data.errcode === '0000') {
            console.log(response)
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            const data = {
              pageSize: this.response.pageSize,
              currentPage: this.response.currentPage,
              ...this.form
            }
            this.updateStepList(data)
          }
        })
      })
    },
    editSteps (edit) {
      this.editInfo = edit
      this.editStepsVisible = true
    },
    editSubmit () {
      this.editStepsVisible = false
      // console.log(this.editInfo)
      api.POST(config.activity.stepUpdate, this.editInfo)
      .then(response => {
        if (response.status !== 200) {
          this.$message.error(response.statusText)
          return
        }
        if (response.data.errcode === '0000') {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          const data = {
            pageSize: this.response.pageSize,
            currentPage: this.response.currentPage,
            ...this.form
          }
          this.updateStepList(data)
        } else {
          this.$message.error('发生了错误,请重试')
        }
      })
      .catch(error => {
        this.$message.error(error)
      })
    }
  },
  mounted () {
    this.getStepList()
  }
}
</script>

<style scoped>

</style>
