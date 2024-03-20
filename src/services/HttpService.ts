import axios, {
  AxiosInstance,
  AxiosResponse,
  CancelTokenSource,
  CancelTokenStatic,
} from "axios";
import { $AuthApi } from "config/axios.http";
import { ErrorResponse } from "types/error-response.type";

export class HttpRequest {
  public path: string;

  $apiKey: string;
  $api: AxiosInstance;
  cancelToken: CancelTokenStatic;
  source: CancelTokenSource;

  constructor(path: string) {
    this.$apiKey = `${import.meta.env.VITE_API_BASE_URL}/${
      import.meta.env.VITE_VERSION_API
    }`;
    this.$api = $AuthApi;
    this.path = path;
    this.cancelToken = axios.CancelToken;
    this.source = this.cancelToken.source();
  }

  url(route = "", routeParams = "") {
    return `${this.path}${route}${routeParams}`;
  }

  processError(error: Record<string, unknown>) {
    console.log("EE", error);
    return this.formatError(error);
  }

  formatError(error: any): ErrorResponse {
    console.log("error", error);
    return JSON.parse(
      JSON.stringify({
        error: true,
        message: error?.response?.data?.message ?? error?.message ?? "",
        details: error?.response?.data?.detail,
        config: error?.config ?? {},
        status: error?.response?.status ?? null,
      })
    );
  }

  async delete<ReturnV>(
    routeParams = "",
    route = ""
  ): Promise<ReturnV | ErrorResponse> {
    return await this.$api
      .delete<void, AxiosResponse<ReturnV>>(this.url(route, routeParams))
      .then(this.parseDataFromAxios.bind(this))
      .catch(this.processError.bind(this));
  }

  async get<ReturnV>(
    routeParams = "",
    route = ""
  ): Promise<ReturnV | ErrorResponse> {
    return await this.$api
      .get<void, AxiosResponse<ReturnV>>(this.url(route, routeParams))
      .then(this.parseDataFromAxios.bind(this))
      .catch(this.processError.bind(this));
  }

  private parseDataFromAxios<TData, ReturnV>(
    response: AxiosResponse<TData, ReturnV>
  ) {
    if (!response) return response;

    return response.data;
  }

  async post<TData, ReturnV>(
    data: TData,
    routeParams = "",
    route = ""
  ): Promise<ReturnV | ErrorResponse> {
    return await this.$api
      .post<void, AxiosResponse<ReturnV, TData>, TData>(
        this.url(route, routeParams),
        data
      )
      .then(this.parseDataFromAxios.bind(this))
      .catch(this.processError.bind(this));
  }

  async put<TData, ReturnV>(
    data: TData,
    routeParams = "",
    route = ""
  ): Promise<ReturnV | ErrorResponse> {
    return await this.$api
      .put<void, AxiosResponse<ReturnV, TData>, TData>(
        this.url(route, routeParams),
        data
      )
      .then(this.parseDataFromAxios.bind(this))
      .catch(this.processError.bind(this));
  }

  abortRequest() {
    this.source.cancel();
    this.source = this.cancelToken.source();
  }
}
