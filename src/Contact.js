{
  "size": 10000,
  "query": {
    "bool": {
      "must": [
        {
          "exists": {
            "field": "primary_account_number"
          }
        },
        {
          "bool": {
            "must_not": [
              {
                "exists": {
                  "field": "first_6_hashed_primary_account_number"
                }
              },
              {
                "term": {
                  "first_6_hashed_primary_account_number": ""
                }
              }
            ]
          }
        },
        {
          "bool": {
            "must_not": [
              {
                "exists": {
                  "field": "last_4_hashed_primary_account_number"
                }
              },
              {
                "term": {
                  "last_4_hashed_primary_account_number": ""
                }
              }
            ]
          }
        }
      ]
    }
  }
}
