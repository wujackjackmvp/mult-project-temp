import config from '@/config'
import { ColorPicker } from 'element-ui';

export function setNoParamsUrl() {
    setTimeout(() => {
        const hashAndParams = window.location.href;
        const hash = hashAndParams.split('?')[0]
        history.replaceState(1, '', hash);
    }, 1500);
}

export function redirectUrl() {
    const href = window.location.protocol + '//' + window.location.host
    let redirect = href.split('?')[0]
    const encodeRedirect = encodeURIComponent(redirect)
    // /finance/SummaryTables
    window.location.href = `${config.redirectUrl}/login?redirect=${encodeRedirect}&projectName=佣金报表系统`
}