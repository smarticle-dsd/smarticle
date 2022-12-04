export type AmplifyDependentResourcesAttributes = {
    "function": {
        "getPaperInfo": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "getKnowledgeGraph": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "getSummaryInfo": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "smarticlelayer": {
            "Arn": "string"
        }
    },
    "api": {
        "backend": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        }
    }
}