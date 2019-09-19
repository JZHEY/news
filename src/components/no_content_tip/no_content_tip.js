import tpl from './no_content_tip.tpl'
import './no_content_tip.scss'
import { tplReplace } from '../../utils/tools';

export default () => {
    return {
        name:'noContentTip',
        tpl(text) {
            return tpl().replace(tplReplace(),text)
        }
    }
}