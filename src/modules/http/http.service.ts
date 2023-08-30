import { Injectable } from "@nestjs/common";
import axios, { AxiosResponse } from "axios";

@Injectable()
export class HttpService {
  async post<T, R = AxiosResponse>(url: string, data: T): Promise<R> {
    const result = await axios.post(url, data);
    return result as R;
  }

  async get<T, R = AxiosResponse>(url: string, data: T): Promise<R> {
    const result = await axios.get(url, data);
    return result as R;
  }
}
