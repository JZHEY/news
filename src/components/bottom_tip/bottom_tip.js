import tpl from './bottom_tip.tpl'
import './bottom_tip.scss'
import { tplReplace } from '../../utils/tools'

export default () => {
    return {
        name:'bottom_tip',
        tpl(loading,text){
            return tpl().replace(tplReplace(),(node,key) => {
                return {
                    loading,
                    text
                }[key]
            } )
        }
    }
}
