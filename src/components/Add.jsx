import styled from 'styled-components';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const AddContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

function Add(props) {
    const { handleFileChange } = props;

    const beforeUpload = (file) => {
        handleFileChange({ target: { files: [file] } });
        return false;
    };

    return (
        <AddContainer>
            <p>Upload a P5.js sketch</p>

            <Upload beforeUpload={beforeUpload} accept=".js" showUploadList={false}>
                <Button icon={<UploadOutlined />}>Sélectionner un fichier</Button>
            </Upload>
        </AddContainer>
    );
}

export default Add;
