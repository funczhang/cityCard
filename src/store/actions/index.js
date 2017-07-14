import fly from '../../assets/js/fly'
// 弹窗
export const toast = ({ commit }, data) => {
        fly.request({
            action: 'BaseComponents.error',
            args: [data]
        });
    }
    // 初始化用户信息
export const initUserData = ({ commit }) => {
        console.log('初始化用户信息');
        return new Promise((resolve, reject) => {
            fly.request({
                action: 'baseComponents.init_request',
                callback: 'init',
                args: ''
            }).done(response => {
                console.log('getUserData---' + JSON.stringify(response))
                if (response) {
                    resolve(response)
                } else {
                    console.warn('初始信息返回为空')
                }
            }).fail(response => {
                reject(response)
                console.warn('初始信息请求失败')
                fly.request({
                    action: 'BaseComponents.error',
                    args: ['数据请求失败']
                })
            });
        })
    }
    // 获得验证码
export const getCode = ({ commit }, data) => {
    // alert('即将给以下号码发送验证码:' + data.phoneNum);
    return new Promise((resolve, reject) => {
        fly.request({
            action: 'baseComponents.interface_request',
            callback: 'A0101',
            args: [data]
        }).done(response => {
            if (response) {
                resolve(response)
            } else {
                console.warn('初始信息返回为空')
            }
        }).fail(response => {
            reject(response)
            console.warn('初始信息请求失败')
            fly.request({
                action: 'BaseComponents.error',
                args: ['数据请求失败']
            })
        });
    })
}


// 选择照片
export const uploadPic = ({ commit }, data) => {
        return new Promise((resolve, reject) => {
            fly.request({
                action: 'baseComponents.value_request',
                callback: 'uploadPicPanel',
                args: [data]
            }).done(response => {
                // alert("返回照片信息：" + JSON.stringify(response));
                if (response) {
                    resolve(response)
                } else {
                    console.warn('初始信息返回为空')
                }
            }).fail(response => {
                reject(response)
                console.warn('初始信息请求失败')
                fly.request({
                    action: 'BaseComponents.error',
                    args: ['数据请求失败']
                })
            });
        })
    }
    // 获得民族字典
export const getNation = ({ commit }) => {
    return new Promise((resolve, reject) => {
        fly.request({
            action: 'baseComponents.interface_request',
            callback: 'M0651',
            args: [{ method: "M0651" }]
        }).done(response => {
            if (response) {
                resolve(response)
            } else {
                console.warn('初始信息返回为空')
            }
        }).fail(response => {
            reject(response)
            alert('nation failed')
            fly.request({
                action: 'BaseComponents.error',
                args: ['数据请求失败']
            })
        });
    })
}

// 获得银行字典
export const getBankList = ({ commit }, data) => {
    return new Promise((resolve, reject) => {
        fly.request({
            action: 'baseComponents.interface_request',
            callback: 'M0649',
            args: [data]
        }).done(response => {
            if (response) {
                resolve(response)
            } else {
                console.warn('初始信息返回为空')
            }
        }).fail(response => {
            reject(response)
            console.warn('银行列表信息请求失败')
            fly.request({
                action: 'BaseComponents.error',
                args: ['数据请求失败']
            })
        });
    })
}

// 判断是否能申请城市卡
export const canApplyCityCard = ({ commit }, data) => {
    return new Promise((resolve, reject) => {
        fly.request({
            action: 'baseComponents.interface_request',
            callback: 'M0648',
            args: [data]
        }).done(response => {
            if (response) {
                resolve(response)
            } else {
                console.warn('初始信息返回为空')
            }
        }).fail(response => {
            reject(response)
            console.warn('信息请求失败')
            fly.request({
                action: 'BaseComponents.error',
                args: ['数据请求失败']
            })
        });
    })
}

// 获得行政区域列表
export const getAreaList = ({ commit }, data) => {
    console.log("区域data");
    console.log(data);
    return new Promise((resolve, reject) => {
        fly.request({
            action: 'baseComponents.interface_request',
            callback: 'M0650',
            args: [data]
        }).done(response => {
            // alert("行政区域:" + JSON.stringify(response));
            if (response) {
                resolve(response)
            } else {
                console.warn('初始信息返回为空')
            }
        }).fail(response => {
            reject(response)
            console.warn('信息请求失败')
            fly.request({
                action: 'BaseComponents.error',
                args: ['数据请求失败']
            })
        });
    })
}

// 是否有电子证照
export const hasZZK = ({ commit }, data) => {
    // alert("电子证照参数：" + JSON.stringify(data));
    return new Promise((resolve, reject) => {
        fly.request({
            action: 'baseComponents.interface_request',
            callback: 'M0654',
            args: [data]
        }).done(response => {
            // alert("是否有电子证照结果:" + JSON.stringify(response));
            if (response) {
                resolve(response)
            } else {
                console.warn('初始信息返回为空')
            }
        }).fail(response => {
            reject(response)
            console.warn('信息请求失败')
            fly.request({
                action: 'BaseComponents.error',
                args: ['数据请求失败']
            })
        });
    })
}



// 获取办事进度
export const getProgress = ({ commit }, data) => {
    return new Promise((resolve, reject) => {
        fly.request({
            action: 'baseComponents.interface_request',
            callback: 'M0655',
            args: [data]
        }).done(response => {
            // alert("办事进度信息:" + JSON.stringify(response));
            if (response) {
                resolve(response)
            } else {
                console.warn('初始信息返回为空')
            }
        }).fail(response => {
            reject(response)
            console.warn('信息请求失败')
            fly.request({
                action: 'BaseComponents.error',
                args: ['数据请求失败']
            })
        });
    })
}


// 提交申请城市卡表单
export const submit = ({ commit }, data) => {
    return new Promise((resolve, reject) => {
        fly.request({
            action: 'baseComponents.interface_request',
            callback: 'M0656',
            args: [data]
        }).done(response => {
            // alert("提交城市卡申请返回信息:" + JSON.stringify(response));
            if (response) {
                resolve(response)
            } else {
                console.warn('初始信息返回为空')
            }
        }).fail(response => {
            reject(response)
            console.warn('信息请求失败')
            fly.request({
                action: 'BaseComponents.error',
                args: ['数据请求失败']
            })
        });
    })
}

// 校验验证码
export const testCode = ({ commit }, data) => {
    return new Promise((resolve, reject) => {
        fly.request({
            action: 'baseComponents.interface_request',
            callback: 'A0107',
            args: [data]
        }).done(response => {
            // alert("校验验证码返回信息:" + JSON.stringify(response));
            if (response) {
                resolve(response)
            } else {
                console.warn('初始信息返回为空')
            }
        }).fail(response => {
            reject(response)
            console.warn('信息请求失败')
            fly.request({
                action: 'BaseComponents.error',
                args: ['数据请求失败']
            })
        });
    })
}

// 校验验证码
export const getMaterialList = ({ commit }, data) => {
    return new Promise((resolve, reject) => {
        fly.request({
            action: 'baseComponents.interface_request',
            callback: 'M0653',
            args: [data]
        }).done(response => {
            // alert("获取材料列表信息:" + JSON.stringify(response));
            if (response) {
                resolve(response)
            } else {
                console.warn('初始信息返回为空')
            }
        }).fail(response => {
            reject(response)
            console.warn('信息请求失败')
            fly.request({
                action: 'BaseComponents.error',
                args: ['数据请求失败']
            })
        });
    })
}


// 将照片附件提交到uc
export const upload2UC = ({ commit }, data) => {
    return new Promise((resolve, reject) => {
        fly.request({
            action: 'baseComponents.interface_request',
            callback: 'M0652',
            args: [data]
        }).done(response => {
            // alert("获取材料列表信息:" + JSON.stringify(response));
            if (response) {
                resolve(response)
            } else {
                console.warn('初始信息返回为空')
            }
        }).fail(response => {
            reject(response)
            console.warn('信息请求失败')
            fly.request({
                action: 'BaseComponents.error',
                args: ['数据请求失败']
            })
        });
    })
}


// 删除上传材料
export const deletePic = ({ commit }, data) => {
    return new Promise((resolve, reject) => {
        fly.request({
            action: 'baseComponents.interface_request',
            callback: 'M0571',
            args: [data]
        }).done(response => {
            if (response) {
                resolve(response)
            } else {
                console.warn('初始信息返回为空')
            }
        }).fail(response => {
            reject(response)
            console.warn('信息请求失败')
            fly.request({
                action: 'BaseComponents.error',
                args: ['数据请求失败']
            })
        });
    })
}



// 获取城市卡列表
export const getCardList = ({ commit }, data) => {
        return new Promise((resolve, reject) => {
            fly.request({
                action: 'baseComponents.interface_request',
                callback: 'M0662',
                args: [data]
            }).done(response => {
                if (response) {
                    resolve(response)
                } else {
                    console.warn('初始信息返回为空')
                }
            }).fail(response => {
                reject(response)
                console.warn('信息请求失败')
                fly.request({
                    action: 'BaseComponents.error',
                    args: ['数据请求失败']
                })
            });
        })
    }
    //跳转实名认证界面
export const goToAuth = ({ commit }, data) => {
    return new Promise((resolve, reject) => {
        fly.request({
            action: 'baseComponents.jump_request',
            callback: 'jumpreturn',
            args: [data]
        }).done(response => {
            resolve(response)
        }).fail(response => {
            reject(response)
        });
    })
}

//加载等待机器人
export const showRobot = ({ commit }, data) => {
    return new Promise((resolve, reject) => {
        fly.request({
            action: 'baseComponents.value_request',
            callback: '',
            args: [data]
        }).done(response => {
            resolve(response)
        }).fail(response => {
            reject(response)
        });
    })
}