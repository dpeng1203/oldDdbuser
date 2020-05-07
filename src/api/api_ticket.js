import { $ } from './axios'
import { stringify } from "qs";

export default {
    merTicket: p => $.post('/zqxry/memedt/service', stringify(p)),
}