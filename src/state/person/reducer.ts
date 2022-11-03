import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';

type Person = {
    id: string;
    name: string;
}

const personsAdapter = createEntityAdapter<Person>();
const personsSelector = personsAdapter.getSelectors();

export const { selectAll: getPersons } = personsSelector;

export const peopleSlice = createSlice({
    name: 'people',
    initialState: {
        persons: personsAdapter.getInitialState()
    },
    reducers: {
        addPerson: (state, action) => {
            personsAdapter.addOne(state.persons, {
                id: uuidv4(),
                name: action.payload
            });
        },
        removePerson: (state, action) => {
            personsAdapter.removeOne(state.persons, action.payload);
        },
    },
})

export const { addPerson, removePerson } = peopleSlice.actions;

export default peopleSlice.reducer