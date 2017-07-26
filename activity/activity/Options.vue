<template>
  <kobe-table v-if="response">
    <div slot="kobe-table-header" class="kobe-table-header">
      <el-row type="flex" justify="end">
        <el-col :span="8">
          <el-input v-model="form.keyword" placeholder="请输入搜索关键字">
          <el-button slot="append" @click="onSearch" icon="search"></el-button>
          </el-input>
        </el-col>
        <el-button @click="openDialog" icon="plus" type="primary"></el-button>
        <el-button icon="upload2" type="primary"></el-button>
        <el-button icon="setting" type="primary"></el-button>
      </el-row>
    </div>

    <div slot="kobe-table-content" class="kobe-table">
      <el-table
        border
        stripe
        :data="response.data"
        >
        <el-table-column prop="id" label="ID" width="80"></el-table-column>
        <el-table-column prop="title" label="属性值名称"></el-table-column>
        <el-table-column prop="type" label="类型"></el-table-column>
        <el-table-column label="状态" width="80px">
          <template scope="scope">
            {{ scope.row.status | isOpen }}
          </template>
        </el-table-column>
        <el-table-column prop="description" label="属性值描述"></el-table-column>
        <el-table-column label="创建时间">
          <template scope="scope">
            {{ scope.row.created_at | toDate }}
          </template>
        </el-table-column>
        <el-table-column
          width="180"
          label="操作">
          <template scope="scope">
            <el-button @click="openDialog(e, scope.row, 'edit')" size="small" icon="edit"></el-button>
            <el-button @click="openDialog(e, scope.row, 'view')" size="small" icon="information"></el-button>
            <el-button @click="deleteOption(scope.row.id)" size="small" icon="delete2"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog :title="selected.title ? selected.title : '活动属性值'" v-model="showDialog">
        <el-form :model="selected" label-width="120px">
          <el-row type="flex">
            <el-col :span="12">
              <el-form-item label="属性值名称" required>
                <el-input v-model="selected.title" :disabled="isDialogDisabled"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="属性值键名" required>
                <el-input v-model="selected.type_key" :disabled="isDialogDisabled"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex">
            <el-col :span="12">
              <el-form-item label="属性值类型" required>
                <el-input v-model="selected.type" :disabled="isDialogDisabled"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="状态" required>
                <el-select v-model="selected.status" :disabled="isDialogDisabled">
                  <el-option label="开启" value="1"></el-option>
                  <el-option label="关闭" value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="描述">
            <el-input type="textarea" v-model="selected.description" :disabled="isDialogDisabled"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeDialog">取消</el-button>
          <el-button @click="createOption" v-if="dialogType === 'add'">确定</el-button>
          <el-button @click="editOption" v-if="dialogType === 'edit'">确定</el-button>
        </div>
      </el-dialog>
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
import api from 'src/api'
import config from 'src/config'

export default {
  name: 'sc-activity-option',
  data () {
    return {
      error: null,
      response: null,
      showDialog: false,
      prop_id: this.$route.query.id,
      dialogType: '',
      isDialogDisabled: false,
      form: {
        keyword: ''
      },
      selected: {
        type_key: '',
        title: '',
        status: '',
        type: '',
        description: ''
      }
    }
  },
  methods: {
    closeDialog () {
      this.showDialog = false
    },
    openDialog (e, data = null, type = null) {
      this.showDialog = true
      if (data && type === 'edit') {
        this.isDialogDisabled = false
        this.dialogType = 'edit'
        this.selected = {
          ...this.selected,
          ...data
        }
      } else if (data && type === 'view') {
        this.dialogType = 'view'
        this.isDialogDisabled = true
        this.selected = {
          ...this.selected,
          ...data
        }
      } else {
        this.isDialogDisabled = false
        this.dialogType = 'add'
        Object.keys(this.selected).forEach(key => {
          this.selected[key] = ''
        })
      }
    },
    deleteOption (id) {
      this.$confirm('是否确认删除该活动类型', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.POST(config.activity.optionDelete, {
          id: id
        })
        .then(response => {
          if (response.data.errcode === '0000') {
            this.onSuccess('删除成功')
          } else {
            this.$message.error('发生错误，请重试')
          }
        })
      })
    },
    editOption () {
      this.showDialog = false
      api.POST(config.activity.optionUpdate, this.selected)
      .then(response => {
        if (response.data.errcode === '0000') {
          this.onSuccess('修改成功')
        }
      })
      .catch(error => {
        this.$message.error(error)
      })
    },
    createOption () {
      this.showDialog = false
      api.POST(config.activity.optionCreate, this.selected)
      .then(response => {
        if (response.data.errcode === '0000') {
          this.onSuccess('添加成功')
        }
      })
      .catch(error => {
        this.$message.error(error)
      })
    },
    onSuccess (string) {
      this.$notify({
        title: '成功',
        message: string,
        type: 'success'
      })
      const data = {
        pageSize: this.response.pageSize,
        currentPage: this.response.currentPage,
        prop_id: this.$route.query.id,
        ...this.form
      }
      this.getList(data)
    },
    onSearch () {
      const data = {
        currentPage: 1,
        pageSize: this.response.pageSize,
        ...this.form
      }
      this.getList(data)
    },
    handleSizeChange (value) {
      const data = {
        currentPage: this.response.currentPage,
        pageSize: value,
        ...this.form
      }

      this.getList(data)
    },
    handleCurrentChange (value) {
      const data = {
        currentPage: value,
        pageSize: this.response.pageSize,
        ...this.form
      }

      this.getList(data)
    },
    getList (data = {}) {
      let query = {
        prop_id: this.prop_id
      }
      api.GET(config.activity.optionList, query)
      .then(response => {
        this.response = response.data.data
      })
      .catch(error => {
        this.$message.error(error)
      })
    }
  },
  mounted () {
    this.getList()
  }
}
</script>

<style>
</style>
