import importlib.metadata
import pathlib

import anywidget
from traitlets import Int, Float, Enum
from traittypes import Array
import lz4.frame
import numpy as np

try:
    __version__ = importlib.metadata.version("ipymcdm")
except importlib.metadata.PackageNotFoundError:
    __version__ = "unknown"


# Code extracted from maartenbreddels ipyvolume
def array_to_binary(ar, obj=None, force_contiguous=True):
    print(f"Serializing array {ar}")
    if ar is None:
        return None
    if ar.dtype.kind not in ['u', 'i', 'f']:  # ints and floats
        raise ValueError('unsupported dtype: %s' % (ar.dtype))
    if ar.dtype == np.float64:  # WebGL does not support float64, case it here
        ar = ar.astype(np.float32)
    if ar.dtype == np.int64:  # JS does not support int64
        ar = ar.astype(np.int32)
    if force_contiguous and not ar.flags['C_CONTIGUOUS']:  # make sure it's contiguous
        ar = np.ascontiguousarray(ar)
    json = {
        'buffer': lz4.frame.compress(memoryview(ar), 0),
        'dtype': str(ar.dtype),
        'shape': ar.shape
    }
    print(json)
    return json


def binary_to_array(value, obj=None):
    buffer = lz4.frame.decompress(value['buffer'], return_bytearray=True)
    return np.frombuffer(buffer, dtype=value['dtype']).reshape(value['shape'])


ndarray_serialization = dict(to_json=array_to_binary, from_json=binary_to_array)

    
class MCDMWidget(anywidget.AnyWidget):
    _esm = pathlib.Path(__file__).parent / "bundle.js"
    # _css = pathlib.Path(__file__).parent / "static" / "widget.css"
    array = Array(default_value=None, allow_none=True).tag(
        sync=True,
        **ndarray_serialization
    )
    minval = Float(0).tag(sync=True)
    maxval = Float(default_value=1).tag(sync=True)
    radius = Int(default_value=4).tag(sync=True)
    blurtype = Enum(('', 'h', 'v', 'both'), default_value='').tag(sync=True)
