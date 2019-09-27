#include <stdio.h>
	
int isSushu(int a){
	int j = 2,count = 0;
	while(j<a){
		if(a%j == 0){
			count++;
		}
		j++;
	}
	
	if(count == 0){
	    return a;
	}else{
	    return 0;
	}
}

int isSushu2(){
    int i;  // 循环次数
    int k;  // m 的平方根 
    // 求平方根，注意sqrt()的参数为 double 类型，这里要强制转换m的类型 
    k=(int)sqrt( (double)a );
    for(i=2;i<=k;i++){
        if(a%i==0)
            break;
    }
    // 如果完成所有循环，那么m为素数
    // 注意最后一次循环，会执行i++，此时 i=k+1，所以有i>k 
    if(i>k){
        // printf("%d是素数。\n",a);
        return a;
    }
    else{
        // printf("%d不是素数。\n",a);
        return 0;
    }
}

int main () {
	int n = 100,count = 0,i = n,m;
	while(i>5){
	    if(isSushu(i) != 0){
	        m = isSushu(i);
	        if(isSushu(m-2) != 0){
    		    printf("%d\n",m);
    		    printf("%d\n",m-2);
    		    break;
		    }
	    }
		i--;
	}
	return 0;
}