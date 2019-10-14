/**
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

suite('fairness-nb-container tests', () => {
  const SLICES_NAMES = [
    'Slice:1', 'Slice:2', 'Slice:3', 'Slice:4', 'Slice:5', 'Slice:6', 'Slice:7',
    'Slice:8', 'Slice:9', 'Slice:10', 'Slice:11', 'Slice:12', 'Slice:13',
    'Slice:14', 'Slice:15', 'Slice:16'
  ];

  const SLICEING_METRICS = SLICES_NAMES.map((slice) => {
    return {
      'slice': slice,
      'sliceValue': slice.split(':')[1],
      'metrics': {
        'accuracy': {
          'doubleValue': Math.random(),
        },
        'post_export_metrics/positive_rate@0.50': {
          'doubleValue': Math.random(),
        },
        'post_export_metrics/true_positive_rate@0.50': {
          'doubleValue': Math.random(),
        },
        'post_export_metrics/false_positive_rate@0.50': {
          'doubleValue': Math.random(),
        },
        'post_export_metrics/positive_rate@0.60': {
          'doubleValue': Math.random(),
        },
        'post_export_metrics/true_positive_rate@0.60': {
          'doubleValue': Math.random(),
        },
        'post_export_metrics/false_positive_rate@0.60': {
          'doubleValue': Math.random(),
        },
        'totalWeightedExamples': {'doubleValue': 2000 * (Math.random() + 0.8)}
      }
    };
  });

  let fairnessContainer;

  test('testMetricsList', done => {
    fairnessContainer = fixture('test-fixture');

    const fillData = () => {
      fairnessContainer.slicingMetrics = SLICEING_METRICS;
      setTimeout(checkValue, 0);
    };
    const checkValue = () => {
      let metricsList =
          fairnessContainer.shadowRoot.querySelector('fairness-metrics-list');
      assert.deepEqual(metricsList.availableMetrics, [
        'post_export_metrics/false_positive_rate',
        'post_export_metrics/positive_rate',
        'post_export_metrics/true_positive_rate', 'accuracy',
        'totalWeightedExamples'
      ]);
      assert.deepEqual(
          metricsList.selectedMetrics,
          ['post_export_metrics/false_positive_rate']);
      done();
    };

    setTimeout(fillData, 0);
  });

  test('testFairnessTable', done => {
    fairnessContainer = fixture('test-fixture');

    const fillData = () => {
      fairnessContainer.slicingMetrics = SLICEING_METRICS;
      setTimeout(checkValue, 0);
    };
    const checkValue = () => {
      let fairnessElement =
          fairnessContainer.shadowRoot.querySelector('fairness-metrics-board');
      assert.deepEqual(
          fairnessElement.metrics, ['post_export_metrics/false_positive_rate']);
      assert.deepEqual(fairnessElement.thresholds, ['0.50', '0.60']);
      done();
    };
    setTimeout(fillData, 0);
  });
});