import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "store"

interface State {
  projectModalOpen: boolean
}

const initialState: State = {
  projectModalOpen: false
}

export const projectListSlice = createSlice({
  name: 'projectListSlice',
  initialState,
  reducers: {
    openProjectModal(state) {
      state.projectModalOpen = true
      //为什么此处可以直接给state的属性赋值（其他时候这么搞检测不到变化，不刷新）？ --> reduc-toolkit 借助 immer 处理
    },
    closeProjectModal(state) {
      state.projectModalOpen = false
    }
  }
})

export const projectListActions = projectListSlice.actions

export const selectProjectModalOpen = (state: RootState) => state.projectList.projectModalOpen