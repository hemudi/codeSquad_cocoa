class GradeManager {
    constructor(grades) {
        this.grades = grades;
    }

    /* 평균 */
    getMean() {
        if (this.grades.length === 0) return '오류'; 
        return (this.grades.reduce((a, b) => a + b) / this.grades.length).toFixed(2);
    }

    /* 표준편차 */
    getStandardDeviation() {
        let mean = this.getMean();
        let result = Math.sqrt(this.grades.reduce((a, b) => a + ((b - mean) ** 2), 0) / this.grades.length);
        return result.toFixed(2);
    }

    /* zScore */
    getZScore(data) {
        let result = (data - this.getMean()) / this.getStandardDeviation();
        return result.toFixed(3);
    }

    /* 표준정규분포표 */
    getZTable() {
        return {
            '0.0': [0.0000, 0.004, 0.008, 0.012, 0.016, 0.0199, 0.0239, 0.0279, 0.0319, 0.0359],
            '0.1': [0.0398, 0.0438, 0.0478, 0.0517, 0.0557, 0.0596, 0.0636, 0.0675, 0.0714, 0.0753],
            '0.2': [0.0793, 0.0832, 0.0871, 0.091, 0.0948, 0.0987, 0.1026, 0.1064, 0.1103, 0.1141],
            '0.3': [0.1179, 0.1217, 0.1255, 0.1293, 0.1331, 0.1368, 0.1406, 0.1443, 0.148, 0.1517],
            '0.4': [0.1554, 0.1591, 0.1628, 0.1664, 0.17, 0.1736, 0.1772, 0.1808, 0.1844, 0.1879],
            '0.5': [0.1915, 0.195, 0.1985, 0.2019, 0.2054, 0.2088, 0.2123, 0.2157, 0.219, 0.2224],
            '0.6': [0.2257, 0.2291, 0.2324, 0.2357, 0.2389, 0.2422, 0.2454, 0.2486, 0.2517, 0.2549],
            '0.7': [0.258, 0.2611, 0.2642, 0.2673, 0.2704, 0.2734, 0.2764, 0.2794, 0.2823, 0.2852],
            '0.8': [0.2881, 0.291, 0.2939, 0.2967, 0.2995, 0.3023, 0.3051, 0.3078, 0.3106, 0.3133],
            '0.9': [0.3159, 0.3186, 0.3212, 0.3238, 0.3264, 0.3289, 0.3315, 0.334, 0.3365, 0.3389],
            '1.0': [0.3413, 0.3438, 0.3461, 0.3485, 0.3508, 0.3531, 0.3554, 0.3577, 0.3599, 0.3621],
            '1.1': [0.3643, 0.3665, 0.3686, 0.3708, 0.3729, 0.3749, 0.377, 0.379, 0.381, 0.383],
            '1.2': [0.3849, 0.3869, 0.3888, 0.3907, 0.3925, 0.3944, 0.3962, 0.398, 0.3997, 0.4015],
            '1.3': [0.4032, 0.4049, 0.4066, 0.4082, 0.4099, 0.4115, 0.4131, 0.4147, 0.4162, 0.4177],
            '1.4': [0.4192, 0.4207, 0.4222, 0.4236, 0.4251, 0.4265, 0.4279, 0.4292, 0.4306, 0.4319],
            '1.5': [0.4332, 0.4345, 0.4357, 0.4370, 0.4382, 0.4394, 0.4406, 0.4418, 0.4429, 0.4441],
            '1.6': [0.4452, 0.4463, 0.4474, 0.4484, 0.4495, 0.4505, 0.4515, 0.4525, 0.4535, 0.4545],
            '1.7': [0.4554, 0.4564, 0.4573, 0.4582, 0.4591, 0.4599, 0.4608, 0.4616, 0.4625, 0.4633],
            '1.8': [0.4641, 0.4649, 0.4656, 0.4664, 0.4671, 0.4678, 0.4686, 0.4693, 0.4699, 0.4706],
            '1.9': [0.4713, 0.4719, 0.4726, 0.4732, 0.4738, 0.4744, 0.475, 0.4756, 0.4761, 0.4767],
            '2.0': [0.4772, 0.4778, 0.4783, 0.4788, 0.4793, 0.4798, 0.4803, 0.4808, 0.4812, 0.4817],
            '2.1': [0.4821, 0.4826, 0.483, 0.4834, 0.4838, 0.4842, 0.4846, 0.485, 0.4854, 0.4857],
            '2.2': [0.4861, 0.4864, 0.4868, 0.4871, 0.4875, 0.4878, 0.4881, 0.4884, 0.4887, 0.489],
            '2.3': [0.4893, 0.4896, 0.4898, 0.4901, 0.4904, 0.4906, 0.4909, 0.4911, 0.4913, 0.4916],
            '2.4': [0.4918, 0.492, 0.4922, 0.4925, 0.4927, 0.4929, 0.4931, 0.4932, 0.4934, 0.4936],
            '2.5': [0.4938, 0.494, 0.4941, 0.4943, 0.4945, 0.4946, 0.4948, 0.4949, 0.4951, 0.4952],
            '2.6': [0.4953, 0.4955, 0.4956, 0.4957, 0.4959, 0.496, 0.4961, 0.4962, 0.4963, 0.4964],
            '2.7': [0.4965, 0.4966, 0.4967, 0.4968, 0.4969, 0.497, 0.4971, 0.4972, 0.4973, 0.4974],
            '2.8': [0.4974, 0.4975, 0.4976, 0.4977, 0.4977, 0.4978, 0.4979, 0.4979, 0.498, 0.4981],
            '2.9': [0.4981, 0.4982, 0.4982, 0.4983, 0.4984, 0.4984, 0.4985, 0.4985, 0.4986, 0.4986],
            '3.0': [0.4987, 0.4987, 0.4987, 0.4988, 0.4988, 0.4989, 0.4989, 0.4989, 0.499, 0.499],
            '3.1': [0.499, 0.4991, 0.4991, 0.4991, 0.4992, 0.4992, 0.4992, 0.4992, 0.4993, 0.4993],
            '3.2': [0.4993, 0.4993, 0.4994, 0.4994, 0.4994, 0.4994, 0.4994, 0.4995, 0.4995, 0.4995],
            '3.3': [0.4995, 0.4995, 0.4995, 0.4996, 0.4996, 0.4996, 0.4996, 0.4996, 0.4996, 0.4997],
            '3.4': [0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4998],
            '3.5': [0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998]
        };
    }

    /* zScore 를 이용해 정규분포표에서 비율 구하기 */
    getPercent(value) {
        const zScore = this.getZScore(value);
        const absValue = Math.abs(zScore);

        let zValue = absValue.toString().slice(0, 3);
        let xValue = absValue.toString().slice(3, 4);

        const getZTableValue = this.getZTable()[zValue][xValue];
        return getZTableValue * 100;
    }

    // start - end 사이 비율
    getBetweenDistribution(start, end) {
        const mean = this.getMean();

        if (start > end) { return '오류'; }

        if (start - mean < 0 && end - mean > 0) {
            return this.getPercent(start) + this.getPercent(end);
        }

        return Math.abs(this.getPercent(start) - this.getPercent(end));
    }
}

const data = [60, 60, 60, 60, 60, 60, 60]; // 테스트 필요
const grades = [89.23, 82.03, 71.56, 78.82, 85.05, 84.44, 67.53, 71.7, 77.97, 73.77, 84.25, 67.01, 73.78, 64.19, 89.89, 90.32, 73.21, 75.35, 83.22, 74.01];

const manager = new GradeManager(grades);

console.log('평균 : ' + manager.getMean());
console.log('표준 편차 : ' + manager.getStandardDeviation());
console.log('------------------------------');
console.log('70 zScore : ' + manager.getZScore(70));
console.log('70 비율 : ' + manager.getPercent(70));
console.log('------------------------------');
console.log('80 zScore : ' + manager.getZScore(80));
console.log('80 비율 : ' + manager.getPercent(80));
console.log('------------------------------');
console.log('70~80 사이의 비율 : ' + manager.getBetweenDistribution(70, 80));
