#!/bin/bash

# Rate Limiting Test Script
# Tests: 5 requests per minute limit

API_URL="http://localhost:3000/api/order"
SUCCESS_COUNT=0
RATE_LIMIT_COUNT=0
ERROR_COUNT=0

echo "======================================="
echo "Rate Limiting Test"
echo "Testing: 5 requests/minute limit"
echo "======================================="
echo ""

TEST_MESSAGE='{
  "message": "🛒 *Test Order*\n\n1x Test Pizza - €10.50\n\n━━━━━━━━━━━━━━━━\n*Totale: €10.50*\n\n👤 *Nome:* Test User\n📞 *Telefono:* +39 123 456 7890"
}'

for i in {1..10}; do
  echo -n "Request $i: "

  RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$API_URL" \
    -H "Content-Type: application/json" \
    -d "$TEST_MESSAGE")

  HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
  BODY=$(echo "$RESPONSE" | head -n-1)

  if [ "$HTTP_CODE" = "200" ]; then
    echo "✓ SUCCESS (200)"
    ((SUCCESS_COUNT++))
  elif [ "$HTTP_CODE" = "429" ]; then
    echo "✗ RATE LIMITED (429) - $BODY"
    ((RATE_LIMIT_COUNT++))
  else
    echo "✗ ERROR ($HTTP_CODE) - $BODY"
    ((ERROR_COUNT++))
  fi

  # Small delay between requests
  sleep 0.1
done

echo ""
echo "======================================="
echo "Test Results:"
echo "  Success (200):     $SUCCESS_COUNT"
echo "  Rate Limited (429): $RATE_LIMIT_COUNT"
echo "  Errors:            $ERROR_COUNT"
echo "======================================="
echo ""

if [ $SUCCESS_COUNT -eq 5 ] && [ $RATE_LIMIT_COUNT -eq 5 ]; then
  echo "✓ PASSED: Rate limiting working correctly!"
  echo "  - First 5 requests succeeded"
  echo "  - Next 5 requests were rate limited"
  exit 0
else
  echo "⚠ UNEXPECTED RESULTS:"
  echo "  Expected: 5 success, 5 rate limited"
  echo "  Got: $SUCCESS_COUNT success, $RATE_LIMIT_COUNT rate limited"
  exit 1
fi
