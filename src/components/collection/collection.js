import tpl from './collection.tpl'
import './collection.scss'
import { tplReplace } from '../../utils/tools'

export default () => {
    return {
        name:'collection',
        tpl(collected){
            console.log(collected)
            return tpl().replace(tplReplace(),collected ? 'full':'o')
        },
        changeCollection(collected){
            $('.collection').addClass(collected ? 'full' : 'o')
                            .removeClass(collected ? 'o' : 'full')
        }
    }
}