

export default function PersonForm({ person, onTextChange, onAddClick, isEditMode, onCancelClick, onUpdateClick }) {
    const { firstName, lastName, age } = person
    return <>
        <div className="row" style={{ marginBottom: 20 }}>
            <div className="col-md-3">
                <input value={firstName} onChange={onTextChange} name='firstName' type="text" className="form-control" placeholder="First Name" />
            </div>
            <div className="col-md-3">
                <input value={lastName} onChange={onTextChange} name='lastName' type="text" className="form-control" placeholder="Last Name" />
            </div>
            <div className="col-md-3">
                <input value={age} onChange={onTextChange} name='age' type="text" className="form-control" placeholder="Age" />
            </div>
            {isEditMode && <>
                <div className="col-md-3">
                    <button onClick={onUpdateClick} className="btn btn-primary" style={{marginRight: 20}}>Update</button>
                    <button onClick={onCancelClick} className="btn btn-primary">Cancel</button>
                </div>
            </>}
            {!isEditMode && <div className="col-md-3">
                <button onClick={onAddClick} className="btn btn-primary w-100" >Add</button>
                
            </div>}
        </div>

    </>
}