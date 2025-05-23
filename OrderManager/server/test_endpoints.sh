#!/bin/bash

GREEN="\033[0;32m"
CYAN="\033[0;36m"
YELLOW="\033[1;33m"
NC="\033[0m"

AUTH="admin:admin"
BASE_URL="http://localhost:8080/api/v1"
COOKIE_JAR="cookies.txt"

function print_header() {
  echo -e "\n${CYAN}=====> $1${NC}"
}

function get_csrf_token() {
  rm -f $COOKIE_JAR headers.txt
  curl -c $COOKIE_JAR -u $AUTH -s -D headers.txt $BASE_URL/product -o /dev/null
  echo "Contenido de la cookie:"
  cat $COOKIE_JAR
  echo "Headers recibidos:"
  cat headers.txt
  CSRF_TOKEN=$(grep 'XSRF-TOKEN' $COOKIE_JAR | tail -1 | awk '{print $7}')
  if [ -z "$CSRF_TOKEN" ]; then
    echo "No se encontró token CSRF"
    return 1
  fi
  echo "Token CSRF: $CSRF_TOKEN"
  return 0
}


function run_curl() {
  local method=$1
  local url=$2
  local data=$3

  echo -e "${YELLOW}curl -u $AUTH -X $method $url${NC}"

  if [[ "$method" == "POST" || "$method" == "PUT" || "$method" == "DELETE" ]]; then
    get_csrf_token
    curl -b $COOKIE_JAR -u $AUTH -X $method "$url" \
      -H "Content-Type: application/json" \
      -H "X-XSRF-TOKEN: $CSRF_TOKEN" \
      -d "$data"
  else
    curl -u $AUTH -X $method "$url"
  fi

  echo -e "\n"
}

print_header "Creating Restaurant for Product Tests"
run_curl "POST" "$BASE_URL/restaurant" '{
  "name": "Test Restaurant",
  "address": "Test Address"
}'

print_header "Testing Product"
run_curl "GET" "$BASE_URL/product"
run_curl "GET" "$BASE_URL/product/1"
run_curl "POST" "$BASE_URL/product" '{
  "restaurant": { "id": 1 },
  "name": "Café",
  "description": "Un buen café",
  "price": 2500,
  "image": "cafe.jpg",
  "active": true
}'
run_curl "POST" "$BASE_URL/product/1" '{
  "restaurant": { "id": 1 },
  "name": "Café especial",
  "description": "Café con sabor especial",
  "price": 3000,
  "image": "cafe_especial.jpg",
  "active": true
}'
run_curl "DELETE" "$BASE_URL/product/1"

print_header "Testing Ingredient"
run_curl "GET" "$BASE_URL/ingredient"
run_curl "GET" "$BASE_URL/ingredient/1"
run_curl "POST" "$BASE_URL/ingredient" '{"name": "Azúcar"}'
run_curl "POST" "$BASE_URL/ingredient/1" '{"name": "Azúcar Morena"}'
run_curl "DELETE" "$BASE_URL/ingredient/1"

print_header "Testing Restaurant"
run_curl "GET" "$BASE_URL/restaurant"
run_curl "GET" "$BASE_URL/restaurant/1"
run_curl "POST" "$BASE_URL/restaurant" '{
  "name": "Sakura Sushi",
  "address": "Calle 45 #12-34"
}'
run_curl "POST" "$BASE_URL/restaurant/1" '{
  "name": "Sakura Grill",
  "address": "Cra 12 #7-89"
}'
run_curl "DELETE" "$BASE_URL/restaurant/1"

print_header "Testing User"
run_curl "GET" "$BASE_URL/user"
run_curl "GET" "$BASE_URL/user/1"
run_curl "POST" "$BASE_URL/user" '{"username": "juan", "email": "juan@example.com"}'
run_curl "POST" "$BASE_URL/user/1" '{"username": "juanito", "email": "juanitoupd@example.com"}'
run_curl "DELETE" "$BASE_URL/user/1"

echo -e "${GREEN}✅ All tests completed.${NC}"
