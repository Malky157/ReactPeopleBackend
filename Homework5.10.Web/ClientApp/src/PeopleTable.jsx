import React from "react";
import axios from "axios";
import PersonForm from "./PersonForm";
import PersonRow from "./PersonRow";

class PeopleTable extends React.Component {

    state = {
        person: {
            firstName: '',
            lastName: '',
            age: ''
        },
        people: [],
        isEditMode: false,
        checkedPeople: []
    }
    onTextChange = e => {
        const copy = { ...this.state.person };
        copy[e.target.name] = e.target.value;
        this.setState({ person: copy });
    }
    getAllPeople = () => {
        axios.get('api/people/getall').then(res => {
            this.setState({ people: res.data });
        });
    }
    componentDidMount = () => {
        this.getAllPeople();
    }
    fillTable = () => {
        return this.state.people.map(p => <PersonRow
            key={p.id} person={p}
            onEditClick={() => this.onEditClick(p)}
            onCheckClick={() => this.onCheckClick(p)}
            checkedPeople={this.state.checkedPeople}
            onDeleteClick={() => this.onDeleteClick(p)}
        />)

    }
    onAddClick = () => {
        axios.post('api/people/addperson', this.state.person).then(() => {
            this.getAllPeople()
        })
        this.setState({
            person: {
                firstName: '',
                lastName: '',
                age: ''
            }
        })
    }
    onEditClick = (p) => {
        this.setState({ person: p, isEditMode: true })
    }
    onCancelClick = () => {
        this.setState({
            person: {
                firstName: '',
                lastName: '',
                age: ''
            },
            isEditMode: false
        })
    }
    onUpdateClick = () => {
        axios.post('api/people/updateperson', this.state.person).then(() => {
            this.getAllPeople()
        })
        this.setState({
            person: {
                firstName: '',
                lastName: '',
                age: ''
            },
            isEditMode: false
        })
    }
    onCheckClick = (p) => {
        const { checkedPeople } = this.state
        if (checkedPeople.includes(p)) {
            this.setState({ checkedPeople: checkedPeople.filter(c => c.id != p.id) })
        }
        else {
            this.setState({ checkedPeople: [...checkedPeople, p] })
        }
    }
    onCheckAllClick = () => {
        const { people } = this.state
        this.setState({ checkedPeople: [...people] })
    }
    onUncheckAllClick = () => {
        this.setState({ checkedPeople: [] })
    }
    onDeleteClick = (person) => {
        const deletepeople = { ids: [person.id] }
        axios.post('api/people/deletepeople', deletepeople).then(() => {
            this.getAllPeople()
        })
    }
    onDeleteAllClick = () => {
        const { checkedPeople } = this.state
        if (checkedPeople.length > 0) {
            const deletepeople = {ids:[...checkedPeople.map(p => p.id)]}
            axios.post('api/people/deletepeople', deletepeople).then(() => {
                this.getAllPeople()
            });
        }
        return;
    }
    render() {
        const { person, people, isEditMode } = this.state
        const { onTextChange, onAddClick, onCancelClick, onUpdateClick, onCheckAllClick, onUncheckAllClick, onDeleteAllClick } = this

        return <>
            <div className="container" style={{ marginTop: 15 }}>
                <PersonForm
                    onTextChange={onTextChange}
                    onAddClick={onAddClick}
                    person={person}
                    isEditMode={isEditMode}
                    onCancelClick={onCancelClick}
                    onUpdateClick={onUpdateClick}
                />
                <table className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th style={{ width: '15%' }}>
                                <button className="btn btn-danger w-100" onClick={onDeleteAllClick}>Delete All</button>
                                <button className="btn btn-outline-danger w-100 mt-2" onClick={onCheckAllClick} >Check All</button>
                                <button className="btn btn-outline-danger w-100 mt-2" onClick={onUncheckAllClick}>Uncheck All</button>
                            </th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.fillTable()}
                    </tbody>
                </table>
            </div>
        </>
    }
}
export default PeopleTable