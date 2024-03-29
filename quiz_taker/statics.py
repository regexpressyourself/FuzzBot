from quiz_taker import app, send_from_directory

##################################################
# Static Routes
##################################################

@app.route('/')
def index():
    return send_from_directory('frontend/views', 'index.html')

@app.route('/test')
def render_test_page():
    return send_from_directory('frontend/views', 'test.html')

@app.route('/about')
def render_about_page():
    return send_from_directory('frontend/views', 'about.html')

@app.route('/results')
def render_results_page():
    return send_from_directory('frontend/views', 'results.html')

@app.route('/assets/<path:path>')
def send_asset(path):
    return send_from_directory('frontend/assets', path)

@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('frontend/js', path)

@app.route('/css/<path:path>')
def send_css(path):
    return send_from_directory('frontend/css', path)

@app.route('/node_modules/<path:path>')
def send_node_mods(path):
    return send_from_directory('frontend/node_modules', path)
