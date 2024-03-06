import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, Modal } from 'antd';
import '../BookNowModal.css'
import axios from 'axios';

function BookNow() {

  const [values, setValues] = useState({ seNumber: '', bonusSeNumber: '', shimukeCode: '', shimukeCenter: '' })
  const [isModalOpen, setIsModalOpen] = useState(false);
 
  function convertPemToBinary(pem) {
    console.log(pem)
    if (typeof pem !== 'string') {
      throw new TypeError('Expected a string for PEM');
    }
    const b64Lines = pem.replace('-----BEGIN PUBLIC KEY-----', '').replace('-----END PUBLIC KEY-----', '').replace(/(\r\n|\n|\r)/gm, '');
    const binaryDerString = window.atob(b64Lines);
    return Uint8Array.from(binaryDerString, (char) => char.charCodeAt(0));
  }
  async function generateKeyPairAndExportPublicKey() {
    try {
      // Generate a key pair
      const keyPair = await window.crypto.subtle.generateKey(
        {
          name: "RSA-OAEP",
          modulusLength: 2048, // can be 1024, 2048, or 4096
          publicExponent: new Uint8Array([1, 0, 1]),
          hash: "SHA-256",
        },
        true,
        ["encrypt", "decrypt"]
      );
  
      // Export the public key to PEM format
      const publicKey = await window.crypto.subtle.exportKey("spki", keyPair.publicKey);
      const publicKeyPem = spkiToPEM(publicKey);
  
      // Output the PEM formatted public key
      console.log(publicKeyPem);
      
      return publicKeyPem;
    } catch (error) {
      console.error('Error generating key pair or exporting public key:', error);
    }
  }
  
  // Helper function to convert an ArrayBuffer to a PEM format string
  function spkiToPEM(keyData) {
    const keyDataString = arrayBufferToBase64String(keyData);
    const pemFormatString = `-----BEGIN PUBLIC KEY-----\n${formatAsPem(keyDataString)}\n-----END PUBLIC KEY-----`;
    return pemFormatString;
  }
  
  // Helper function to convert an ArrayBuffer to a base64 string
  function arrayBufferToBase64String(arrayBuffer) {
    const byteArray = new Uint8Array(arrayBuffer);
    let byteString = '';
    for (let i = 0; i < byteArray.byteLength; i++) {
      byteString += String.fromCharCode(byteArray[i]);
    }
    return window.btoa(byteString);
  }
  
  // Helper function to format base64 string as PEM format content
  function formatAsPem(str) {
    let finalString = '';
    while (str.length > 0) {
      finalString += str.substring(0, 64) + '\n';
      str = str.substring(64);
    }
    return finalString;
  }
  
  // Call the function to generate a key pair and output the public key in PEM format

  async function encryptDataAndSymmetricKeyWithPublicKey(data, publicKeyPem) {
    try {
      // Step 1: Generate a symmetric AES-GCM key
      const symmetricKey = await window.crypto.subtle.generateKey(
        {
          name: "AES-GCM",
          length: 256, // can be 128, 192, or 256
        },
        true, // whether the key is extractable (i.e., can be used in exportKey)
        ["encrypt", "decrypt"] // can "encrypt", "decrypt", "wrapKey", or "unwrapKey"
      );
  
      // Convert data to an ArrayBuffer
      const encodedData = new TextEncoder().encode(data);
  
      // Step 2: Encrypt the data with the symmetric key
      const iv = window.crypto.getRandomValues(new Uint8Array(12)); // Initialization vector for AES-GCM
      const encryptedData = await window.crypto.subtle.encrypt(
        {
          name: "AES-GCM",
          iv: iv,
        },
        symmetricKey, // from generateKey or importKey above
        encodedData // ArrayBuffer of data you want to encrypt
      );
  
      // Step 3: Export the symmetric key and encrypt it with the RSA public key
      const exportedSymmetricKey = await window.crypto.subtle.exportKey("raw", symmetricKey);
      const encryptedSymmetricKey = await encryptWithPublicKey(exportedSymmetricKey, publicKeyPem);
  
      // Step 4: Return the encrypted data and the encrypted symmetric key
      return {
        encryptedData: arrayBufferToBase64(encryptedData),
        encryptedSymmetricKey: arrayBufferToBase64(encryptedSymmetricKey),
        iv: arrayBufferToBase64(iv) // The IV needs to be sent alongside the data for decryption
      };
    } catch (error) {
      console.error('Error during the encryption process:', error);
    }
  }
  
  // Helper function to encrypt the symmetric key with the RSA public key
  async function encryptWithPublicKey(data, publicKeyPem) {
    // Import the RSA public key
    const publicKey = await window.crypto.subtle.importKey(
      "spki",
      convertPemToBinary(publicKeyPem),
      {
        name: "RSA-OAEP",
        hash: {name: "SHA-256"},
      },
      true,
      ["encrypt"]
    );
  
    // Encrypt the symmetric key
    return window.crypto.subtle.encrypt(
      {
        name: "RSA-OAEP",
      },
      publicKey,
      data // ArrayBuffer of the symmetric key
    );
  }
  
  // Convert ArrayBuffer to Base64
  function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
  
  const onFinish = async (values) => {
    console.log('Success:', {values});
    const publicKeyPem = await generateKeyPairAndExportPublicKey(); // Await the publicKeyPem
    const dataObject = JSON.stringify(values); // Stringify the values to encrypt them
    const newData = await encryptDataAndSymmetricKeyWithPublicKey(dataObject, publicKeyPem); 
    console.log(newData)
  };
  
  
  
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const handleChange = (event) => {
    const { name, value } = event.target
    setValues(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const isDisabled = () => {
    const { seNumber, bonusSeNumber, shimukeCode, shimukeCenter } = values
    if (seNumber && bonusSeNumber && shimukeCode && shimukeCenter) {
      return false;
    } return true;
  }


  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
        marginTop: 130,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="SE Number"
        name="seNumber"
        rules={[
          {
            required: true
          },
        ]}
      >
        <Input
          name='seNumber'
          value={values.seNumber}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item
        label="Bonus SE Number"
        name="bonusSeNumber"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input
          name="bonusSeNumber"
          value={values.bonusSeNumber}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item
        label="Shimuke Code"
        name="shimukeCode"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input
          name="shimukeCode"
          value={values.shimukeCode}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item
        label="Shimuke Center"
        name="shimukeCenter"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input
          name="shimukeCenter"
          value={values.shimukeCode}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" disabled={isDisabled()} htmlType="submit">
          Submit
        </Button>
        <Modal title="Basic Modal" open={isModalOpen}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      </Form.Item>
    </Form>
  );
}

export default BookNow;
