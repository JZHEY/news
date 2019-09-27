import tpl from './bottom_loading.tpl'
import './bottom_loading.scss'
import { replaceRegExp } from '../../util/tools'

export default () => {
    return {
        name:'bottom_loading',
        tpl(options){
            return tpl().replace(replaceRegExp(),(node,key) => {
                return {
                    text:options.text,
                    isloading:options.isloading ? 'loading' : 'none'
                }[key]
            })
        }
    }
}