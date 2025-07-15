class ApiResponse {
    constructor(statuCode = 200, data = {}, message = "Fetched successfully") {
        this.statuCode = statuCode
        this.data = data
        this.message = message
        this.success = true
    }
}

module.exports = ApiResponse