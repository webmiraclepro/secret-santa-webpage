import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';

type Rule = {
    id: string;
    firstPerson: string;
    secondPerson: string;
    isVerca: true
}

const rulesAdapter = createEntityAdapter<Rule>();
const rulesSelector = rulesAdapter.getSelectors();

export const { selectAll: getRules } = rulesSelector;

export const ruleSlice = createSlice({
    name: 'rule',
    initialState: {
        rules: rulesAdapter.getInitialState()
    },
    reducers: {
        addRule: (state, action) => {
            const { people1, people2, checked } = action.payload
            rulesAdapter.addOne(state.rules, {
                id: uuidv4(),
                firstPerson: people1,
                secondPerson: people2,
                isVerca: checked
            });
        },
        removeRule: (state, action) => {
            rulesAdapter.removeOne(state.rules, action.payload);
        },
    },
})

export const { addRule, removeRule } = ruleSlice.actions;

export default ruleSlice.reducer