"aggs": {
  "group_by_primary_account_number": {
    "terms": {
      "field": "primary_account_number",
      "size": 10000  // Adjust this size according to your need
    },
    "aggs": {
      "filtered_docs": {
        "filter": {
          "bool": {
            "must": [
              {
                "exists": {
                  "field": "primary_account_number"
                }
              },
              {
                "bool": {
                  "should": [
                    {
                      "bool": {
                        "must_not": {
                          "exists": {
                            "field": "first_6_hashed_primary_account_number"
                          }
                        }
                      }
                    },
                    {
                      "term": {
                        "first_6_hashed_primary_account_number": ""
                      }
                    }
                  ],
                  "minimum_should_match": 1
                }
              },
              {
                "bool": {
                  "should": [
                    {
                      "bool": {
                        "must_not": {
                          "exists": {
                            "field": "last_4_hashed_primary_account_number"
                          }
                        }
                      }
                    },
                    {
                      "term": {
                        "last_4_hashed_primary_account_number": ""
                      }
                    }
                  ],
                  "minimum_should_match": 1
                }
              }
            ]
          }
        },
        "aggs": {
          "primary_account_numbers": {
            "terms": {
              "field": "primary_account_number",
              "size": 10000
            }
          }
        }
      }
    }
  }
}