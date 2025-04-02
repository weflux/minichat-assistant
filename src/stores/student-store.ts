import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import createSelectors from './libs/selector'

interface State {
	selectedId: string
	students: Student[]
}

export interface Student {
	id: string
	name: string
}

interface Action {
	setStudents: (students: Student[]) => void
	selected: () => Student|null
	setSelectedId: (id: string) => void
}

const initialState: State = {
	selectedId: '',
	students: [],
}

const studentStore = create<State & Action>()(
	immer((set, _get) => ({
		selectedId: '',
		students: [],
		setStudents: students => set({ students: students }),
		setSelectedId: selected => set({ selectedId: selected }),
		selected: () => {
			const state = _get()
			if (!state.selectedId) {
				return null
			}
			if (state.students.length === 0) {
				return null
			}
			const selected = state.students.filter(student => student.id === state.selectedId)
			if (selected.length === 0) {
				return null
			}
			return selected[0]
		},
	}))
)
export const useStudentStore = createSelectors(studentStore)

export function useStudentStoreReset() {
	studentStore.setState(initialState)
}
