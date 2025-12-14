import {  Modal, Form, Input } from 'antd';
import { useTranslatedText, useTranslatedTexts } from '../../hooks/useTranslatedText';
import { useMemo } from 'react';

const UpdateModal = ({isModalVisible,setIsModalVisible}) => {
    const [form] = Form.useForm();
  
    const editProfileText = useTranslatedText("Edit Profile");
    const usernameText = useTranslatedText("Username");
    const pleaseInputUsernameText = useTranslatedText("Please input your username!");

    const handleOk = () => {
      form
        .validateFields()
        .then((values) => {
          console.log('Received values of form: ', values);
          setIsModalVisible(false);
        })
        .catch((info) => {
          console.log('Validate Failed:', info);
        });
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };
  return (
    <Modal
      title={editProfileText}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} layout="vertical" name="userForm">
        <Form.Item
          name="username"
          label={usernameText}
          rules={[{ required: true, message: pleaseInputUsernameText }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateModal;
