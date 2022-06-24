import {Injectable, OnInit} from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentChangeAction
} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";
import {User} from "../model/interfaces/user";
import {AuthService} from "./user/auth.service";
import {snapshotChanges} from "@angular/fire/compat/database";
import {onSnapshot} from "@angular/fire/firestore";



@Injectable({
  providedIn: 'root'
})
export class UserDataService implements OnInit {
  private userCollection: AngularFirestoreCollection<User>;

  constructor(private afs: AngularFirestore,
              public authService: AuthService) {
    this.userCollection = this.afs.collection('users');
    this.userCollection.valueChanges();
    this.userCollection.snapshotChanges();
  }
  ngOnInit(): void {
  }
  getUserDataById_Observable(userId: string): Observable<any>{
    return this.userCollection.doc(userId).valueChanges();
  }
  uptate(attribute: string, value : string){
    attribute = attribute.toUpperCase();
    switch (attribute) {
      case 'NAME':
        this.userCollection.doc(this.authService.userData.uid).update({displayName:value});
        break;
      case 'DISPLAYNAME':
        this.userCollection.doc(this.authService.userData.uid).update({displayName:value});
        break;
      case 'EMAIL':
        this.userCollection.doc(this.authService.userData.email).update({displayName:value});
        break;
      case 'PHOTOURL':
        this.userCollection.doc(this.authService.userData.photoURL).update({displayName:value});
        break;
      case 'EMAILVERIFIED':
        this.userCollection.doc(this.authService.userData.emailVerified).update({displayName:value});
        break;
      default:
        console.log('erreur atribute bei uptate')
        break;


    }
  }
  uptatename(name : string,user: any){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    this.uptataLocalStorage(user);
    console.log(localStorage.getItem('user'));

    return userRef.update({displayName:name});

  }
  deleteUser(){
        this.userCollection.doc(this.authService.userData.uid).delete();
  }
  test(){
    const userData: User = {
      uid: 'anlage',
      email:'anlage@gmail.com',
      displayName:'anlage1',
      photoURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhISEhIQFRUVFRUPFRUVFRUPDxUVFRUWFhUVFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGi0lICUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIANAA8gMBIgACEQEDEQH/xAAcAAACAwEBAQEAAAAAAAAAAAADBAIFBgEABwj/xAA9EAABAwIEAggFAgUCBwEAAAABAAIDBBEFEiExQVEGEyJhcYGRoTJCscHRI/AUUmJy4QczJDRjc5LC8RX/xAAaAQACAwEBAAAAAAAAAAAAAAAEBQECAwAG/8QANREAAQMCAwQKAgEDBQAAAAAAAQACAwQREiExE0FRcQUiYYGRobHB0fAy4SMUUnIVM0Ji8f/aAAwDAQACEQMRAD8AQC6SpuCXlckd0OvPcgOChJKg9eoIUI5XA1QzqBeqqUwAphJiVFbIoUJxiZYk4npxjwrAKbooNkxTU8kl8jC629tglS5bbolBanDuLnF/poPohK+rNNFjaLm4Gf3sW9PGJHWKyz8MmAzFhtxtZ1vGyXBX0l7OI3+qocdwQSNMkQAfuWjQO/yl9L0yHuwzADtG7n8+SJko7C7DdZQvUesSj5bXB3GiGZk8ugU/1i9dJNmR43KLrkYBTa1cjbdPQwLRjSVF0BoUrlOthCIIQiWsPFRdKR3TPUXRMgC6HLccCuxFLGmURAU3nXrqha0rsSG5tgqqqGqaxGqsqh06Gls02XKTyhdbZRMygCsWm+qkInWleU+qXlayshulQ3pKGW6dZqs1RJzRpNzbK4fGkp41N1yTD110iDObIQkU4VyPnRmPSzQjxBRZQm45EYToTGL0jLKFyajmX0/oz/y0X9v3K+RMevqvRV//AAsJ/p+5SXpxv8Lf8vYo6h/J3L3V1dCOh8dV5zkOV2gK80AmaxfTjDMp/iGDQm0g7+DvsVj+tX1usja9rmuFwQWkcwV8ixSjMMr4j8p0PNp1afReq6IqdpHsnat05fpLquLCcY3+qLC5WVLGSksMiuVpYIgAnbYgdUA5wC9TQ2CaDrKIKFfVENFlndM3Xb2UWGwQnOur3XFycihMgOTUjdvzeIS2oNjcHkd0zg7rSs7+yfAhW+NUIc0yAdpu/e38hKJK00tS2GU3Y4ZE6gk2seI7TmL5k2RQh2sRkbqNRuPLhyVE0qFRUhoSlVUZQs9WYiSUyfKGIZqbrajMUqHJTrlPrEI4km5V1MyC6Zgcq61yn6Zq664nNN5yvLll5VsV1lS00ZVhEvQxaLrnALiq3RLoMzV3OovcqLgVV1MaVESs5BdAfGtWlTdAARWuUXBDKlcn45EQm6rWPKs8Ibnka08SuaCSAN66yfw/AZJW5hYDhdbzo3GWUzGO3bmafUpWCENblbsBonsOkJYQdwbJb03hNOANQ4ehRtC7+QjsKbfJsVFzrghAe7srgevLhqaEKWbRY/pph+d0cgGv+076j7rUh1iR3perjDgQfFHUT9lO1x0vnyOSymZjjIWUw+iyhWOyO8AJR5Xt2gXXn7orHXRo4ralCpWaolRJwCtdQuON10IYCI1cclVP4RF2weQzfYLSDW456Kmw5lgOZ7R+wVkx68P0xMJ5yRoBYe/nfuXoKOIxxC+pz+9y+f486z3M5EhZuWNaHpG69TL/AHfYKpe1emZIZI2vOpA9Epe0NcWjcUmFLMvThBbdXVU/SAcU9mAVfTlFkmXKAmOvXEnmK8pzU3UX1tglnVaRlcVAXUhiorRtSrHB8OlqHWYBYfE46Mb58T3Kko48zg3MG33cTYADclaCXpIYWthpLNa3eQgFzjxIvp5oecyDqRDrHjoO34W0TGfk/TzK2GH9C4GgGTrJDxuerj8gNfdW8OCU7Php4vHK1x9SsJhHTydjgJ7SM4kANlHeLaHwX0egrY5mNkjcHNdsR9DyK8xXx1cR/mJIO8HL4HKwTSExOHUHlmguo4NjFF5saB9ElV9GKOUawxjvZ+k71arshBdEOGh9vRAMlc03a4g9hW5aDqFgcW/0/cLup5M39D7B3k8aHzAVBhsD4KmNsrXMN7WcLenML60ZCND/AIKWxGljlble0OG4vuDzaeCcUnTEsbhtesOO/wCD3+KGko2OzZkfJIRbpiBti7v1QA3LYXvbQHifFG6zb0R1dIyanLmG4uPVC0rHR1Aa4cfRcLtHBDD9F2+p7wlY3JIGpvvRpD2vFQe5cmdsVFxVsK4KuqdCQlgLpiv+LyC9SRcV7Wkfjha47wF5uZmGRze0rz+yO9BYpSuuVNrUQDldZFdCZpWfMduA5lDijvqdvqmGlJOka/WOPXeeHYPuXPRlR0d7SP03Din4D7plsml/NV7HfvuS2O4j1UL3X1tlb/cdB+fJecERe4NGpyTUuAzO5Y3FKnNLI4cXut6pB9RZQBSk7tV7BrA1oaN2S8+4kkk705nup5EvTFHklUlcu5rKQN0oXJmEqAoTGVeXrryspsqp8SEQnXuFkm9ytdUUCLqbAvMKKVZTZDerPo70glpZLt1YfjYdj3jkVVuK6GrOWNkjSx4uCrte5puF9wwvE454xJGbg7jiDxBHNMucvj/R3H3U0gI1YdHt4Ecx3hfVqWsbIxssZDmuFxb97rx1dQOpn5fidD7Ht9U4p5hK3tGqK53A7H0QJmkajUe4RHEEabcR+EuZbfv6oVo4IhI1LkKObh7otWziNuI5KvL7FHRfiQN6jCCQTuTrnagpdzrOK86VBndqCpa1akJhz7tUcyCH6Fca9WwqAFGqbct8LKTzlbbyXZHbLj2Em3Ie5/YTejqXnBGMmtBJ7bXO/IDOyVVUADnP1JIA70GGPS6O2Pi70/Kk3TxXCVFX0k54wRZDjvPLh68lemoA3rS+HypFy41ygNVNgSohMCjtcsZ0mrTJJlHws08XcT9lo8breqiJ+Z3Zb48T5LEyOTLoynuTKeQ9/hL62Ww2Y7/v3chZkPIvPcvNeE5cUuJRGiyidVBz06+jc2OOTdsgNjyc0kFp79is7gEA71wCVARYyhvcg9arLlYZ15I9evKbLrpL+MQ3T3SAlXRIidmustFhdC6RkjwbBgv4neyA191p+hEQfTH/ALjgfQKmxnDHQSZT8Lu0x3Ajl4hLo6kOmfGTocu7X5W0kWFjXDvSJKg6Vcf3JSR6MAuh12WRaXoL0oNPJ1Uh/SeePyPPzeB4rJOUSVE1OyaMxvGR+3WschjcHBfoKR/zN23/AMoUjr6jzWD6C9KLgU8x1GkbjxH8p7+S2L5Muo2Xjp6R8EhjfruPEJ3G9sjcQXnyKvrG21GyckcCLhJTP3UxCxVwENslwoTSaJITZXW9ESV9wRzRWzsVtqEyJF0PVG3EQND4Jo1YtdXMDguVux1yO7Uqbn/lKRTC3uVB9SOBWWE5hVLBfEdU2XLjdUKLVNNYqHJQQugfvmjMbYXOgGvcAiQwcSs50jrZn3jihm6v5nZHdv20aojbtX4AbcSsZX7Nt1SY7iPWykj4R2W+HPzVU+ZNOo5XGzYpSeQY4n0AVpQ9CaqTV4bEP+obyf8AiPvZeh2sFOwAuAA7fbVJiySV17ElZl7lxr1tHdB2j4pyfBn5KVk6GtG05847/wDsqDpGmP8Ay8j8K39JLw8x8rMXWjxCTq8PpmH4pHunH9gvr55mpuj6KRggvkc/X4Q3qwe4m5Nkn05qc0zGC36bALDQAu1sPLKszMyomYxmYBxE2toDbXtKtsXRMc52/Lx/SzckyAXrsgQ3JqGoZT61eS9l5ThCm6r5QoBycnjRsPwWSY9kWHNEgiykOFlpP9OMdZFK6GY2jltZx2a8bX7ivo+OYI2aF0Ztrqxw1s7gQVgcO6NRsALtSFqaCtfEA1hOUfKdQkPSNAXybaB1ncOJG8Hd9zW0VUwDC4ZLK0uAFp7Z20IVkMIh4tWkdJHJd2VhPHn6LjXtGwYPLVR/qxaLFhvvGWvmeWSsKFzsw4W3alUEnRdsgsyJ3cQCqOv6HTsd/tPLT/SdF9IhxWyZZi4Qp6bqAf8AbFuZ++SIFA3+4+S+WUPRZ9zmzcxYH3WkwqtqYzkmie5nyyWOYdzgd/HfxW0GItKi+dhQ1T0o6fJ0Qtz05Gw91tFS7M3Dj4BVDXg6tPkgzi/cU7VQRnUdk8xoqipmczk4ehQ8YxaIuypsVkLd9LJVmNNDRmvYm2mtijYriTHtcMj7jwPnoqLDaUvcYhvmJPMC1gB7p1DE10d5Bayzc9wNmpWvxAdb2XXaTfTU3VkyrzOj1IaCHHvtsEKrwUxueNyLPNtTsdPZWONVdP8Aw/6bgXuFgBYkaceVkS8sOAMBN9/uVRhd1i7ciPxQHRp8U9QAu8PZZPCZmMIz6m+4F9+YWngxSP5ST5IWohLOqwd63Y8PzWipxYaeqbMjWC59OJVJT1bzsLd5TkNPc3cSUpfHY9YrQkDRONqC866DlwVlDUsaO9IxCNvC6N/HAbABDPbiyAyWRJTjsSPBpPkSlZquQ/Lb0CWfiLjshF8juahsIbnYBVJKnK53EgIG+1yjCl4uKSxbGYKZt3kX4NGsjvAfdbsGIhrBc9ioTYXKPV1DII3SyHYaDiTwA7yvm1RVGV7pHbuJcfPh9kDHMfkqpLu0aPhYDcDvPMpeGRejoaEwNLn/AJHyHD5Sypm2hsNAm3gKBjUHSI0bkehUDq11MWXVy66uqDo+0av1PJXUUDWCwAHgpkqBKqXErC5KnmChdCym+yII+eigW1UqUUhabhWUcocLjQ8RyVZ1rRwv9Fw1juCEq6Vs4uMjx49hRNPUGE2OYVu02TEUw5BVMFXf4tO9OsF+K8/NC5hwvFinUb2yC7TdWsVQOTUU1Df5QqtsZ5+yPHAf5vZCOjatQiTTt/lHos3jrm5TYWPdotQ2gB3Lj7KuxiGKJpLrD3cfBa072teALkqSF81pK10UuaT4e8X8rKeLTDrxO3rYmOAAfbQuG4I5fhSrGullBtkF7C4u233TmK4fPeKEFj47dY3SxuNx4L0hc0Pa42BIIPLwtdYdbCRbQ5feCzNfiL3ZnmSTMXb62y7eiLhE0WeBsjSGnV7hqXcveyAaJznvY1hztJDmXu21777AbKeHuMbmFkZBD+qc5wvHqbao5wZgLW+Rtuy/WqGa447n53qz6RSxue0RjTa45bfhW+BYboDdAxjCrMzmXO42NmgAD+0BTwIuB+I279/Q7Ja54dT2YdOaMa0h5xLX01Hpuno6P+pJUjnW/CsYZj3JBKXX1WxA4qbaFvElTFNGOHqoVAmI/TMYPJzSR6g/ZYzHcYxCE2eGsB0DmMDmHweb+m6tBTyTuwtcL8L29s0PNKIxdwK2rnNGwCqsS6RQRfE9t+Q7TvQL53VYpNJ8csru69m+g0VZKU0h6HGsjvD5/SCdW/2tWmxfprI64hGQfzHV/kNgsbV1LnuLnOLidyTcqb0s9qeU9PFCLMFvXxQrpHP/ACKi2RNRzJIhEYiHBVTjZU3FIq1l0wxyoQqqy6xeSXWLyzsq2X0QyqQZb4lFxA21KHck6qt0OjPn0sNPqlyV0hMUlPnOUb2uPwsnyNY0udortBecI1S+3BdDUSphc09oEHv28kzhdD1hu45WcXc+4LOSdjGYyer90VmRuc7CBmkJpQBvoncGD3m7M7h3C7fM7LUU+HU4taJhtxcM3nqnv4ljRYW8BoPRJJulwRhbHf8Ay+B8hM46EtNy7w+UjTUUu5DB3G5PtonGQOG/Vj1Kg+t8vqvMmJ2170me57zcgDkj29UWv4r00bz89vAWKRfgzD2n3cf6tfVWoZtfU+ynlVBK5v4laDtXzrpFh7ySWiwGx/Cx8k0xfdz3aWbfiBxsvsmJU4cCLLI1XRy2Y25uP1T6ir2htnjkqubdZPFquFrWPpgGyk9oj4nDjm5+aj/B1TKYGzMr7uJ+cXJN+9P0/Rw6G26bqsPe1re07KCAWnb97JiJGZMYb53N8zlfLu3LOwF3HLl2rP4dTyveA5xK3OG0JA7TeX7uq6gowJAef1W2o2Agc0ur6sm1hkto8gq6KIt1G3uFYQFrt/XimJKW+o3VfIch10vxSrFtOauQFZCEt1GoRXRRyNLHta5rhYtcLgpOnq7J5r2u7jzCHcCPlUK+ZdM+h5przQ3dD8w3dH4829/DjzWJlcv0QRoQ4BzSLHiCDuCF8n6d9CnQZqimaXQnVzBq6Lw5s+ngvRdF9KYyIpznudx7D2+vNK6mkt1macFiSuFi6zVSIXo9EElyxSYxFamo4l2JcSlmsR2QIjYU1G1ULlUlK9SvJzReUYl11rjqpKLnAIbp/wB/lZLABTlma3ew+qThxS7ri4sdCND4qb6YP1K4+hAGik2AutQAFfHH87crxG7vc3VDbiXgLbaaeSy0rSEaGQjigH0cJGTbcvjRENqpG53vz+3WoGJE/MPWyNHOT8wCybtVASkbIY9HNtkfL9rcV/Fvn+luo5Y26vePX8pimxZr3ZIWl55/IO9ztgvnweSQOZA9V9QpImRRtaxoHhxPM80tradlOBe7idNwFuKJp5XTE2FgO9NwtsNTc8T+F6aSyDJUBo13Va+pzHu+qVNjLjdGJ5hzG/Dh3lAxMdnJxdf04qFViDIGF8hsBsOJ7gOaBTTl+aQ/MBbkBwC3ZG789w9VJcNE5DQtyjTkq/pBQt6o6cQfdXcPwtVN0onsGs4nU+S0oXOdUsH/AGv3A3PkspyBG6/BZ+GQW7xv+VosLqAQOeyw1TOWu3T+D4zleA7jpdN6yiNiWZhD09Y11mvyPkV9CYbpbEKMPaRZdo5rgJxwuF5zNjskeV82/wD0ZaWV0brvZe4vuAdrFaHDMZjk+B2vFp0cPJV3TamAex3MFvpY/crJltjmBII2I0IXpGwR1ULZNHHf8j/xKXVD4JCw5j2X1emrE6x4O3ovnWE46/4Ze0ODuK09JiG1jdKKmhfGcx8FHRzMkF2n5VB0q6Ate501IA1x1dFs0nmz+U923gsJNhT2ktc0tI0IIsQvt0FWHb7+6FiNBFKP1Ggng4aO8j9kbRdLyw2jlFxuO8fIQ01IH9ZmR8l8ZgwruTzcPstfiWEdUbjtNOx4+BSDowvRR1DZW42G4SqRrmOwu1WZlpLJSXsrS1MQVHWxBXBzVQq3rV5e6peW+SstdnJQXvsU31OiXdCboVzSVmpwz2RJKpAczRIvDiVJbuU3Rp5AvUz2lzQdibJc0rt9VwQkaqr2GylpzurGogcwm4NuB4JJ0i02EYxEW5JrDhqLtKZqosMaMzizwYTc+QS41r4zgkjN+wXui/6drusxwt27lRYBT55Wk/Cz9R3lsPVbKTEQNTvwHJY+fpFCwFsEJaO82v3ncqpnxiV/zWHIae+6ylpZKp+JwsNBf9X1W8U0UDMN7nfb9rZ1eKDdzgPE2VXV9KmMH6Yzu57Rj8rKPkKVc9ER9Gxj8s/JVdXOdk0W8/15K0nxOSZ2aR1zwGzQO4LbYJWh0DeY/TPlt7L5rEVoMFrCzwO4WtXSiSINaNNFnBPgku7fqvq1M64b4LK9KJf+Isf5R73Kt6TEWti6w7Bo8+QWHx6sc6TOTqTf8BJ+iad+1dJbIC3eSjK2QCO3FBrwC8g+IVJLKQVdYo09h45KvqYs4uF6AZGyVHWy1vQrHs/6Lz2hq08x+VuY3aL4zh1M6N7Xg9oG4X1nCasSMa4ctV5zpikEbxI3Q+qb0U+0ZhOo8ws1/qJtC0b9p3lYD7rCnNdfRumsFzE7+5v0KyT6QJr0WAaVvf6lL64/zHu9EOgbdW8EmXbZJwx2TDUwMbXtwuFwhGvcx2JpsVb09Z++IVrTVdxzCy8byDdXFG5rtWuyu/fBeerqPZHs4/Kc09SJW9vD3TddsRu0+yzlTHlNvQ8wtIWm2o+4Kq6+DQ+3cVFDUbJ1tx1+VWph2jctRos5WOVS91yrSueqZ0guvSJS1F6gLyj/ABS8owuU3WkzKL0MOXS9bLGyi5CEYupuco3UEKEUhCc0KQchvK5SoyxAhVVVTW2VrdCeq2yUg5qidcbrsadrILjRVzXWNlICvqjynRKXTJ1QXNUBWBXM9k7QVWtlWPT2GRdoKxbkpAX0XBoOtpwDsCfbb7rMY5QvjmDXbHVp5j8rXdDqppa+O4zN7Vu4/wCUTpZStfA5wHaj/UHP+oen0XnGVLoKt0bvxJ9dCmUkYkhBGoHospVvYYQORsSqgsLe8cCmYTeN7e7MgRG4sf8A4npCVk3RoZyFreimI6lvLUjuKxrbgkFWGG1fVyNfw2PgUPVw7aBzfBbU0uzlBOmhX0PG6brYTbcfqN8RuPRYhbqjmBaCDcHXwWWxelySOHA9seBS3oSWznQO5j3HofFF9JRXtIOR9ki0KQUQF1eiPAJUp3QZJOSk9yFa6yeoKap8UlZs645HVGmxYEdptu9v4VfkSNc42QRo4Xm5bbtGSIZUSt0Puk6yozOPigSU9wggkOurCGUEI0nCLBVVX1JXlbZAvK+1C5POUXEpTrVI1K4LMFTc9eEi4JAVFzeSm65Ezrhcg3K9mXEAqEUvQy5RcVy6r2Llx5VZUQcQrGRAfsuUhI5l22iHIdbJkR9lRZaJaOMEq0ghyjNdVDb5tFagnKApOS5Spqx8b+sY4tcOP2PMLQDpbLls9kbidL6i/ks1ZSPAckLLTxSkF7b/AHxV2TPZk0q2ZVh7rZGNzX+EWSDQAbXUqU2c096nUR2kcO+/qtmRtZk0Krnl2ZXHC47xsvNvzXgFwtINxey4ixWeqv8ABsWezsk3HD8K0q6kTAXFnDZZOKTvV5RVbTa+6V1VPspBNGM9eR+CmNPMHs2T/v3chu0QyUaseC822QQE2Y+7ATvCWvFnEKCk1SLUjUVGVZucqhM1EwAVVPOClq2rJGiUiaSrWBC0ARZTqhtkIRXUrhqUNzFo2yvZT/iCuofVleVrNXL/2Q==',
      dayOfBirth: new Date("2010-01-16"),
      emailVerified: true,
    };
    this.SetUserData(userData);
  }
  setData(userId: string, email: string,displazname: string,photoURL: string,dayOfBirth: Date){
    const userData: User = {
      uid: userId,
      email:email,
      displayName:displazname,
      photoURL: photoURL,
      dayOfBirth: dayOfBirth,
      emailVerified: true,
    };
    this.SetUserData(userData);
  }
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      dayOfBirth: user.dayOfBirth,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });

  }

  uptataLocalStorage(user:any){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      dayOfBirth: new Date("2010-01-16"),
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  getallchange(){
    this.userCollection.snapshotChanges()
  }



}
