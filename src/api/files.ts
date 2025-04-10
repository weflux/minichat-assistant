import { FilePrepareRequest, FilePrepareResult } from "src/api/types/files"
import request from "src/utils/request"

namespace FilesAPI {
  export function prepare(data: FilePrepareRequest): Promise<FilePrepareResult> {
    return request.post('/api/v1/files/prepare', data);
  }
}

export default FilesAPI;
