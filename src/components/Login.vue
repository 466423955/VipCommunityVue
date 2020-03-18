<template>
<div class="form-signin" id="login">
    <div class="text-center mb-4">
        <img class="mb-4" src="./../assets/icons/vip.svg" alt="" width="72" height="72">
        <h1 class="h3 mb-3 font-weight-normal" id="0f1630af-d33c-5690-d675-8ee6a09a57c6">Hasaki VIP Community</h1>
    </div>

    <div class="form-label-group">
        <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="">
        <label for="inputEmail">Email address</label>
    </div>

    <div class="form-label-group">
        <input type="password" id="inputPassword" class="form-control" placeholder="Password" required="">
        <label for="inputPassword">Password</label>
    </div>

    <div class="checkbox mb-3">
        <label>
            <input type="checkbox" value="remember-me" id="remember-me"> Remember me
        </label>
    </div>
    <button class="btn btn-lg btn-primary btn-block" v-on:click="login_post()">Sign in</button>
    <p class="mt-5 mb-3 text-muted text-center">© 2020-202X</p>
</div>
</template>

<script>
export default {
    name: 'Login',
    methods:{
        setCookie:function(cname,cvalue,exhours){
            var d = new Date();
            d.setTime(d.getTime()+(exhours*60*60*1000));
            var expires = 'expires='+d.toUTCString();
            document.cookie = cname+'='+cvalue+'; '+expires+'; path=/';
        },
        login_post:function(){
            var email = $('#inputEmail').val();
            var password = $('#inputPassword').val();
            var remember = $('#remember-me').prop('checked');
            if (!email || !password) {
                alert('邮箱地址和密码不允许为空！');
                return false;
            }
            this.$axios.post('/login', JSON.stringify({
                    'inputEmail': email,
                    'inputPassword': hex_md5(password)
                }), {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    }
                })
            .then((res) => {
                var response = res.data;
                if (response.code == 200) {
                    if(remember){
                        this.$options.methods.setCookie("tokenMaxAge", (24*30).toString(), 24*30);
                        this.$options.methods.setCookie("token", response.data.token, 24*30);
                    } else {
                        this.$options.methods.setCookie("tokenMaxAge", (0.5).toString(), 0.5);
                        this.$options.methods.setCookie("token", response.data.token, 0.5);
                    }
                    this.$router.push({ path: '/' });
                } else {
                    alert(response.code + ":" + response.message);
                }
            })
            .catch((error) => { 
                alert('服务器好像开小差了！'+error);
            });
        }
    }
}
</script>

<style scoped>
.form-label-group {
    position: relative;
    margin-bottom: 1rem;
}

.form-label-group > label {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    margin-bottom: 0;
    line-height: 1.5;
    color: #495057;
    pointer-events: none;
    cursor: text;
    border: 1px solid transparent;
    border-radius: .25rem;
    transition: all .1s ease-in-out;
}

.form-label-group > input, .form-label-group > label {
    height: 3.125rem;
    padding: .75rem;
}

.form-signin {
    width: 100%;
    max-width: 420px;
    padding: 15px;
    margin: auto;
}

.form-signin .form-control {
    display: block;
    width: 100%;
    padding: .375rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}

.form-label-group input:not(:placeholder-shown) {
    padding-top: 1.25rem;
    padding-bottom: .25rem;
}

.form-label-group input:not(:placeholder-shown) ~ label {
    padding-top: .25rem;
    padding-bottom: .25rem;
    font-size: 12px;
    color: #777;
}
</style>
