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