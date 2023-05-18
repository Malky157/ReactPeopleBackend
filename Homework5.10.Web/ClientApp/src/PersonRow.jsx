export default function PersonRow({ person, onEditClick, onCheckClick, checkedPeople, onDeleteClick }) {
    const { id, firstName, lastName, age } = person
    return <>
        <tr>
            <td>
                <div className="d-flex justify-content-center align-items-center">
                    <input type="checkbox"
                        className="form-check-input mt-2"
                        style={{ transform: (1.5) }}
                        onChange={onCheckClick}
                        checked={checkedPeople.includes(person)}
                    />
                </div>
            </td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{age}</td>
            <td>
                <button className="btn btn-warning" onClick={onEditClick}>Edit</button>
                <button className="btn btn-danger" style={{ marginLeft: '10px' }} onClick={onDeleteClick}>Delete</button>
            </td>
        </tr>
    </>    
}
