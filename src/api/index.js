/**
 * Makes a POST request to expand a node in the folder tree
 * @param {Object} params - The parameters for the request
 * @returns {Promise} The response from the server
 */
export const getFolders = async ({params, multipart = false}) => {
    const headers = {}
    
    // Solo agregar Content-Type si NO es multipart
    if (!multipart) {
      headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    
  
      const response = await fetch('http://localhost:8100/sysworkflow/en/lurana/appFolder/appFolderAjax.php', {
        method: 'POST',
        headers,
        body: params
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    try {
      const res = await response.json();
      return res;
    } catch (error) {
      console.error('Error expanding node:', error);
      return null
    }
  } 