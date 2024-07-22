
//first query
{
  "query": {
    "bool": {
      "must_not": [
        { "exists": { "field": "PAN_number" } },
        { "exists": { "field": "SE_number" } },
      ],
      "filter": [
        {
          "bool": {
            "should": [
              { "terms": { "issuer_deal_code": ["ss", "nn", "tt"] } },
              { "bool": { "must_not": { "exists": { "field": "issuer_deal_code" } } } }
            ],
            "minimum_should_match": 1
          }
        },
        { "term": { "stage": 4 } },
        {
          "range": {
            "start_date": {
              "gte": "2024-01-01",
              "lte": "2024-12-31"
            }
          }
        }
      ]
    }
  }
}

//{
  "query": {
    "bool": {
      "must": [
        { "exists": { "field": "PAN_number" } },
        {
          "bool": {
            "should": [
              {
                "bool": {
                  "must_not": [
                    { "exists": { "field": "6" } },
                    { "term": { "6": "" } }
                  ]
                }
              },
              {
                "bool": {
                  "must_not": [
                    { "exists": { "field": "4" } },
                    { "term": { "4": "" } }
                  ]
                }
              }
            ],
            "minimum_should_match": 2
          }
        }
      ],
      "filter": [
        {
          "bool": {
            "should": [
              { "terms": { "issuer_deal_code": ["ss", "nn", "tt"] } },
              { "bool": { "must_not": { "exists": { "field": "issuer_deal_code" } } } }
            ],
            "minimum_should_match": 1
          }
        },
        { "term": { "stage": 4 } },
        {
          "range": {
            "start_date": {
              "gte": "2024-01-01",
              "lte": "2024-12-31"
            }
          }
        }
      ]
    }
  }
}


////3rd query

{
  "query": {
    "bool": {
      "must_not": [
        { "exists": { "field": "PAN_number" } },
        { "term": { "PAN_number": "" } }
      ],
      "must": [
        {
          "bool": {
            "should": [
              {
                "bool": {
                  "must_not": [
                    { "exists": { "field": "6" } },
                    { "term": { "6": "" } }
                  ]
                }
              },
              {
                "bool": {
                  "must_not": [
                    { "exists": { "field": "4" } },
                    { "term": { "4": "" } }
                  ]
                }
              }
            ],
            "minimum_should_match": 2
          }
        }
      ],
      "filter": [
        {
          "bool": {
            "should": [
              { "terms": { "issuer_deal_code": ["ss", "nn", "tt"] } },
              { "bool": { "must_not": { "exists": { "field": "issuer_deal_code" } } } }
            ],
            "minimum_should_match": 1
          }
        },
        { "term": { "stage": 4 } },
        {
          "range": {
            "start_date": {
              "gte": "2024-01-01",
              "lte": "2024-12-31"
            }
          }
        }
      ]
    }
  }
}

