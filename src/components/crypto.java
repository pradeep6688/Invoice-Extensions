import javax.crypto.Cipher;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.util.Base64;

public class DataDecryptor {

  // The size of the GCM authentication tag in bits
  private static final int GCM_TAG_LENGTH = 128;

  public static String decryptData(String encryptedData, String encryptedSymmetricKey, String ivString, String privatePem) throws Exception {
    // Convert the encrypted symmetric key and iv from Base64 to byte array
    byte[] encryptedKeyBytes = Base64.getDecoder().decode(encryptedSymmetricKey);
    byte[] ivBytes = Base64.getDecoder().decode(ivString);

    // Decrypt the encrypted symmetric key with the RSA private key
    byte[] symmetricKeyBytes = decryptSymmetricKeyWithPrivateKey(encryptedKeyBytes, privatePem);

    // Decrypt the data with the symmetric key
    Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
    SecretKeySpec keySpec = new SecretKeySpec(symmetricKeyBytes, "AES");
    GCMParameterSpec gcmParameterSpec = new GCMParameterSpec(GCM_TAG_LENGTH, ivBytes);
    cipher.init(Cipher.DECRYPT_MODE, keySpec, gcmParameterSpec);
    
    byte[] decryptedDataBytes = cipher.doFinal(Base64.getDecoder().decode(encryptedData));

    // Convert decrypted bytes back to the original string
    return new String(decryptedDataBytes);
  }

  private static byte[] decryptSymmetricKeyWithPrivateKey(byte[] encryptedKey, String privatePem) throws Exception {
    // Remove the first and last lines and newlines and decode from base64
    String privateKeyPEM = privatePem
        .replace("-----BEGIN PRIVATE KEY-----", "")
        .replace("-----END PRIVATE KEY-----", "")
        .replaceAll("\\s", "");
    byte[] encoded = Base64.getDecoder().decode(privateKeyPEM);

    KeyFactory keyFactory = KeyFactory.getInstance("RSA");
    PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(encoded);
    PrivateKey privateKey = keyFactory.generatePrivate(keySpec);

    Cipher cipher = Cipher.getInstance("RSA/ECB/OAEPWithSHA-256AndMGF1Padding");
    cipher.init(Cipher.DECRYPT_MODE, privateKey);
    return cipher.doFinal(encryptedKey);
  }
  
  // Example usage
  public static void main(String[] args) throws Exception {
    String encryptedData = "ENCRYPTED_DATA_HERE";
    String encryptedSymmetricKey = "ENCRYPTED_SYMMETRIC_KEY_HERE";
    String ivString = "IV_HERE";
    String privatePem = "YOUR_RSA_PRIVATE_KEY_PEM_HERE";

    String decryptedData = decryptData(encryptedData, encryptedSymmetricKey, ivString, privatePem);
    System.out.println("Decrypted Data: " + decryptedData);
  }
}
