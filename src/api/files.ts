import {GetPreSignedUrlRequest, GetPreSignedUrlResult} from "src/api/types/files"
import request from "src/utils/request"

namespace FilesAPI {
  export function getPreSignedUrl(data: GetPreSignedUrlRequest): Promise<GetPreSignedUrlResult> {
    return request.post('/api/v1/files/preSignedUrl', data);
  }
}

export default FilesAPI;
