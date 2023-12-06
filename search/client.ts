import {
    SearchClient,
    AzureKeyCredential
} from '@azure/search-documents';

const credential = new AzureKeyCredential(process.env.AZURE_SEARCH_KEY as string);

export const usersSearchClient = new SearchClient(
    process.env.AZURE_SEARCH_URL as string,
    'users',
    credential
)

export const notebooksSearchClient = new SearchClient(
    process.env.AZURE_SEARCH_URL as string,
    'notebooks',
    credential
)