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
        <el-table-column prop="id" label="ID" width="50"></el-table-column>
        <el-table-column prop="title" label="类型名称" width="120"></el-table-column>
        <el-table-column prop="type_key" label="类型键名" width="130"></el-table-column>
        <el-table-column prop="brief" label="描述"></el-table-column>
        <el-table-column prop="content" label="内容"></el-table-column>
        <el-table-column prop="url" label="链接"></el-table-column>
        <el-table-column prop="sort" label="排序" width="80"></el-table-column>
        <el-table-column label="状态" width="80">
          <template scope="scope">
            {{ scope.row.active | isOpen }}
          </template>
        </el-table-column>
        <el-table-column 
          width="180"
          label="操作"
          >
          <template scope="scope">
            <el-button @click="openDialog(e, scope.row, 'edit')" size="small" icon="edit"></el-button>
            <el-button @click="openDialog(e, scope.row, 'view')" size="small" icon="information"></el-button>
            <el-button @click="deleteType(scope.row.id)" size="small" icon="delete2"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog :title="selected.title ? selected.title : '活动类型'" v-model="showDialog">
        <el-form :model="selected" label-width="120px">
          <el-row type="flex">
            <el-col :span="12">
              <el-form-item label="分类名称" required>
                <el-input v-model="selected.title" :disabled="isDialogDisabled"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="排序" required>
                <el-input v-model="selected.sort" :disabled="isDialogDisabled"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex">
            <el-col :span="12">
              <el-form-item label="键值" required>
                <el-input placeholder="示例: check_attendance" v-model="selected.type_key" :disabled="isDialogDisabled"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="状态" required>
                <el-select v-model="selected.active" :disabled="isDialogDisabled">
                  <el-option label="开启" value="1"></el-option>
                  <el-option label="关闭" value="0"></el-option>
                </el-select>  
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="链接">
            <el-input placeholder="示例:https://www.example.com" v-model="selected.url" :disabled="isDialogDisabled"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input type="textarea" v-model="selected.brief" :disabled="isDialogDisabled"></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <el-input type="textarea" v-model="selected.content" :disabled="isDialogDisabled"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeDialog">取消</el-button>
          <el-button @click="createType" v-if="dialogType === 'add'">确定</el-button>
          <el-button @click="editType" v-if="dialogType === 'edit'">确定</el-button>
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
  name: 'sc-activity-category',
  data () {
    return {
      response: null,
      error: null,
      showDialog: false,
      dialogType: '',
      form: {
        keyword: ''
      },
      isDialogDisabled: false,
      selected: {
        id: '',
        title: '',
        type_key: '',
        content: '',
        active: '',
        brief: '',
        sort: '',
        url: ''
      }
    }
  },
  methods: {
    createType () {
      this.showDialog = false
      api.POST(config.activity.typeCreate, this.selected)
      .then(response => {
        if (response.data.errcode === '0000') {
          this.onSuccess('添加成功')
        }
      })
      .catch(error => {
        this.$message.error(error)
      })
    },
    editType () {
      this.showDialog = false
      api.POST(config.activity.typeUpdate, this.selected)
      .then(response => {
        if (response.data.errcode === '0000') {
          this.onSuccess('修改成功')
        }
      })
      .catch(error => {
        this.$message.error(error)
      })
    },
    deleteType (id) {
      this.$confirm('是否确认删除该活动类型', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.POST(config.activity.typeDelete, {
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
    onSuccess (string) {
      this.$notify({
        title: '成功',
        message: string,
        type: 'success'
      })
      const data = {
        pageSize: this.response.pageSize,
        currentPage: this.response.currentPage,
        ...this.form
      }
      this.getList(data)
    },
    openDialog (e, data = null, type = null) {
      if (data !== null && type === 'edit') {
        this.dialogType = 'edit'
        this.isDialogDisabled = false
        this.selected = {
          ...this.selected,
          ...data
        }
      } else if (data !== null && type === 'view') {
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
      this.showDialog = true
    },
    closeDialog () {
      this.showDialog = false
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
    onSearch () {
      const data = {
        currentPage: 1,
        pageSize: this.response.pageSize,
        ...this.form
      }
      this.getList(data)
    },
    getList (data = {}) {
      api.GET(config.activity.typeList, data)
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
