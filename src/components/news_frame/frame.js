import tpl from './frame.tpl'
import './frame.scss'
import { tplReplace } from '../../utils/tools'

export default () => {
    return {
        name:'newsFrame',
        tpl(url){
            return tpl().replace(tplReplace(), url)
        }
    }
}