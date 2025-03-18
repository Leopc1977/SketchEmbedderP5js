function Add(props) {
    const { handleFileChange } = props;

    return (
        <input 
            type="file" 
            accept=".js" 
            onChange={handleFileChange} 
            id="file-input"
        />
    )
}

export default Add;
