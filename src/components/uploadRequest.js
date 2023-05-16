import { BlobServiceClient } from '@azure/storage-blob';
import { InteractiveBrowserCredential } from '@azure/identity'
const storageAccountName = 'infracredit';

const defaultAzureCredential = new InteractiveBrowserCredential({
    clientId: 'ded3f2ff-d210-4678-a453-490a10391f76',
    tenantId: '2373a921-a6fe-4ee1-a785-838b208582ee'
});

export default {

    async uploadFiles(fileInput) {
        const blobClient = new BlobServiceClient(
            `https://${storageAccountName}.blob.core.windows.net`,
            defaultAzureCredential
        );

        const containerName = 'infracredit';
        const containerClient = blobClient.getContainerClient(containerName);

        let i = 1;
        let containers = blobClient.listContainers();
        for await (const container of containers) {
            try {
                const promises = [];
                //  const blockBlobClient = containerClient.getBlockBlobClient(fileInput.name)
                //  promises.push((await blockBlobClient.uploadBrowserData(fileInput)));

                const blobName = fileInput.name + new Date().getTime();
                const blockBlobClients = containerClient.getBlockBlobClient(fileInput.name);
                await blockBlobClients.upload(fileInput, blobName.length);

                await Promise.all(promises);
                const totalValue = {
                    finishedLoading: true,
                    url: blockBlobClients.url
                }
                return totalValue
            } catch (error) {
                alert("Error Occured, please try again", error);
            }
        }
    }

}